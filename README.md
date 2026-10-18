 Campus-Life-Planner
An accessible, mobile-first responsive web application built with vanilla HTML, CSS, and JavaScript. This application serves as a personal task scheduler and study-time tracker for students, enabling efficient management of tasks, events, time durations, and custom tags.
• Author: a.anyar1@alustudent.com
• Live App Link: https://aanyar1-tech.github.io/Campus-Life-Planner/
• Code Repository: https://github.com/aanyar1-tech/Campus-Life-Planner

Project Structure & Links

Click these links to view your project directory files directly on GitHub:
• 📄 index.html - Structured page landmarks and screen-reader anchors.
• 📁 styles/styles.css - Tablet/desktop breakpoints, animations, and focus indicators.
• 📁 scripts/app.js - App logic engine, local storage syncing, and event handling.
• 📄 seed.json - Complete 10 item test dataset tracking campus milestones.
• 📄 tests.html - Diagnostic validation suite for checking regex rules.

Features List

• Multi-Section SPA Layout: Seamless tab switching between Dashboard, Task Schedule, Add Task, and Settings views.
• Time Statistics Dashboard: Displays real-time calculations for Total Tasks, Total Minutes, and the Top utilized study tag.
• Dynamic Study Time Cap: Reactive target management system that alerts students via ARIA Live regions if daily parameters are exceeded.
• Schedule Ledger Table: Displays all logged planner records with quick-action inline deletion and modular row updates.
• Advanced Data Sorting: Allows users to filter and reorder items based on calendar dates and minute durations.
• Live Regular Expression Search: Fully protected input compiler with automated case-insensitive filters and interactive keyword match highlighting.
• Unit Conversions: Converts tracked study duration blocks back and forth seamlessly between minutes and hourly formats.
• Persistent Data Storage: Automatic background synchronization with standard browser localStorage interfaces.
• JSON Import & Export: Built-in structural validation checks for secure external backup round-trips.

Regex Catalog

1. Task Title / Description Format
	• Pattern: /^\S(?:.*\S)?$/
	• Purpose: Strictly prevents unformatted entries containing leading or trailing empty spaces.
	• Example Pass: "Chemistry Exam Preparation"
	• Example Fail: " Review Math "
2. Duration Minute Count
	• Pattern: /^(0|[1-9]\d*)$/
	• Purpose: Restricts input criteria specifically to clean, positive whole numbers representing task minutes.
	• Example Pass: "120"
	• Example Fail: "45.5"
3. Calendar Target Date
	• Pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
	• Purpose: Validates formal HTML5 input strings against strict structural calendar templates.
	• Example Pass: "2026-10-17"
	• Example Fail: "17-10-2026"
4. Tag Classification Characters
	• Pattern: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/
	• Purpose: Blocks special characters and enforces clean hyphens or spaces between letters.
	• Example Pass: "Lecture-Notes"
	• Example Fail: "Study#Group!"
5. Advanced Duplicate Word Check (Back-Reference)
	• Pattern: /\b(\w+)\s+\1\b/i
	• Purpose: Highlights accidental typing repetitions in task descriptions and throws a caution icon flag.
	• Example Catch: "Lab assignment assignment submission"

Keyboard Navigation Map

• Tab / Shift + Tab: Move system focus sequentially forward and backward across global navigation anchors, form text fields, selection boxes, and button interfaces.
• Enter / Space: Activate active navigation tabs, expand options dropdown elements, and trigger operational buttons.
• Arrow Keys: Navigate standard operational parameters inside dropdown elements and scroll historical ledger rows.
• Alt + S (Custom Rule): Jumps your screen view focus directly to the top main navigation banner landmark instantly.

Accessibility (a11y) Implementation Notes

• Semantic Landmarks: Constructed with strict standard structural wrappers (<header>, <nav>, <main>, <section>) to assist user screen-readers.
• Explicit Label Binding: All data fields use verified for properties bound directly to distinct input field unique identifiers.
• Visible Focus Rings: Customized high-contrast blue focus borders (*:focus-visible) ensure clear spatial layout positioning during keyboard navigation paths.
• ARIA Live Notifications: Utilizes explicit polite and assertive configuration attributes to announce immediate state mutations, empty results alerts, or threshold warning conditions cleanly.

Running Project Test Framework

1. Open your primary operating system file explorer window.
2. Locate your root task planner workspace directory.
3. Double-click on the clean tests.html document file directly.
4. This launches an isolated browser script instance executing your regular expression assertion suite, instantly printing standard diagnostic pass and fail logs.

