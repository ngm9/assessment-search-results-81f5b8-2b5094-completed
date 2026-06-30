# Browse Assessments — Search & Results Page

## Task Overview

You are working on the **Browse Assessments** feature of the Utkrusht skills marketplace. Candidates visiting this page type a domain keyword (e.g., "Machine Learning", "DevOps") to find available skill assessments. The feature was partially built by a previous developer and shipped with several issues that are now causing a poor user experience: searches fire too frequently, failed network requests leave the page in a broken state, and the results list is not readable on small screens or by assistive technologies. Your job is to bring this page up to production quality by fixing the broken behaviour across all three layers — markup, styles, and JavaScript.

## Objectives

- Search requests should only be triggered when the user clicks the **Search** button or presses the **Enter** key inside the input field — not on every keystroke.
- When a fetch request fails for any reason, the loading indicator must be hidden and a human-readable error message must appear inside the `#search-error` element.
- Assessment results must be rendered as a proper semantic list and laid out using a Flexbox or Grid approach so cards display in multiple columns on wider screens and stack to a single column on screens narrower than 640 px.
- The search input must be correctly associated with its label, and the results region must be announced to screen readers when content changes.

## Helpful Tips

- Consider how different HTML elements communicate meaning and structure to both browsers and assistive tools — a list of results is semantically different from a collection of generic containers.
- Think about which CSS layout technique lets you define a multi-column grid that automatically collapses to one column at a breakpoint, and where CSS custom properties could make colour and spacing values easier to maintain.
- Explore how a single JavaScript function can be attached to two different events (button click and keyboard Enter) without duplicating logic.
- Review how `async/await` with `try/catch` lets you control exactly what happens in both success and failure paths, including always cleaning up UI state like a loading indicator.

## How to Verify

- Type in the search box and confirm **no network request fires** until you click Search or press Enter.
- Open DevTools → Network tab, submit a search, and confirm exactly one request is made per submission.
- Temporarily change the fetch URL to something invalid and confirm the loader disappears and the error message appears inside `#search-error`.
- Resize the browser window below 640 px and confirm result cards stack to a single column without overlapping or overflowing.
- Tab through the page using only the keyboard and confirm the input label, button, and result cards are reachable and meaningful.