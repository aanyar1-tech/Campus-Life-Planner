 Campus-Life-Planner
A simple, easy-to-use web app for tracking student tasks, durations (in minutes), and tags. It is built using vanilla HTML, CSS, and JavaScript.
• Author: a.anyar1@alustudent.com
• Live App Link: https://aanyar1-tech.github.io/Campus-Life-Planner/
• Code Repository: https://github.com/aanyar1-tech/Campus-Life-Planner

Project Structure & Links

Click these links to view your project files directly on GitHub:
• 📄 index.html - Main layout with clear headers, navigation tabs, and inputs.
• 📁 styles/styles.css - Mobile-friendly design, text colors, and visible focus rings.
• 📁 scripts/app.js - App logic, data auto-save to localStorage, and search features.
• 📄 seed.json - 10 default sample student tasks for testing.
• 📄 tests.html - A quick test page to check your input validation rules.

Core Features

• Dashboard Stats: Displays total tasks, total minutes, top tags, and tracks your daily study limit.
• Task Ledger Table: Lists tasks with options to update or delete rows inline.
• Regex Search: Allows users to filter tasks with real-time text matching.
• Data Saving: Automatically keeps data secure even when you refresh the page.

Input Validation Rules (Regex)

1. Task Title: /^\S(?:.*\S)?$/ - Disallows empty leading or trailing spaces.
2. Duration: /^(0|[1-9]\d*)$/ - Requires whole numbers for minutes.
3. Due Date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|\d|3)$/ - Enforces standard YYYY-MM-DD templates.
4. Tags Group: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/ - Blocks characters outside letters and hyphens.
5. Duplicate Check: /\b(\w+)\s+\1\b/i - Highlights accidental double-typed words automatically.

Accessibility Map

• Tab / Shift + Tab: Moves focus across buttons and inputs without using a mouse.
• Enter / Space: Selects fields and shifts screen view tabs.
• Focus Rings: Blue borders help you see exactly where your keyboard cursor is sitting.
• Live Announcements: Reads alert warnings out loud for screen-reader tools.
