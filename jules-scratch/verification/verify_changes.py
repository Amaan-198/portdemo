import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Listen for console events and print them
    page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))

    try:
        # 1. Login to the admin panel
        print("Navigating to login page...")
        page.goto("http://localhost:5173/login")

        print("Filling in login credentials...")
        page.get_by_label("Email Address").fill("shaikhamaanahmed@gmail.com")
        page.get_by_label("Password").fill("AmaanIsCool2005")

        print("Submitting login form...")
        page.get_by_role("button", name="Sign In").click()

        # Wait for navigation to the dashboard after login
        expect(page).to_have_url(re.compile(r'.*/admin/dashboard'))
        print("Login successful. Navigated to dashboard.")

        # 2. Update the profile with a resume URL
        print("Navigating to profile edit page...")
        page.goto("http://localhost:5173/admin/profile/edit")

        # Wait for the page to load by checking for the heading
        print("Waiting for profile edit page to load...")
        expect(page.get_by_role("heading", name="Edit Profile")).to_be_visible()
        print("Profile edit page loaded.")

        resume_input = page.get_by_label("Resume Link (URL)")
        expect(resume_input).to_be_visible()

        test_resume_url = "https://example.com/test-resume.pdf"
        print(f"Updating resume URL to: {test_resume_url}")
        resume_input.fill(test_resume_url)

        print("Saving profile...")
        # Use a try block to catch potential navigation timeouts
        try:
            # Wait for the network response from the profile update
            with page.expect_response(re.compile(r'.*/api/profile')) as response_info:
                page.get_by_role("button", name="Update Profile").click()

            response = response_info.value
            print(f"API Response Status: {response.status}")
            print(f"API Response Body: {response.json()}")

            # Now, wait for the navigation to the dashboard
            print("Waiting for navigation to dashboard...")
            page.wait_for_url(re.compile(r'.*/admin/dashboard'), timeout=5000)
            print("Profile updated successfully.")
        except Exception as e:
            print(f"Error during profile update or navigation: {e}")
            raise

        # 3. Navigate to the homepage and verify the changes
        print("Navigating to the public homepage...")
        page.goto("http://localhost:5173/")

        # Wait for the hero section to be visible
        hero_section = page.locator("#home")
        expect(hero_section).to_be_visible(timeout=10000)

        # 4. Verify the "Download Resume" button
        print("Verifying the 'Download Resume' button...")
        resume_button = page.get_by_role("link", name="Download Resume")
        expect(resume_button).to_be_visible()
        expect(resume_button).to_have_attribute("href", test_resume_url)
        expect(resume_button).to_have_attribute("target", "_blank")
        print("Resume button verified successfully.")

        # 5. Take a screenshot for visual verification
        print("Taking screenshot...")
        page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)
        print("Screenshot saved to jules-scratch/verification/verification.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        # On error, take a screenshot for debugging
        page.screenshot(path="jules-scratch/verification/error_screenshot.png")
    finally:
        context.close()
        browser.close()

with sync_playwright() as playwright:
    run(playwright)