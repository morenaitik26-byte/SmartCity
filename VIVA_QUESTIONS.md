# SmartCity AI — Viva Questions & Answers

## Core questions
**1. What is the title of your project?**  
SmartCity AI — Smart City Management and Emergency Response Simulator.

**2. What problem does it demonstrate?**  
It demonstrates how a dashboard can organise traffic, air-quality, water-reserve, and incident information.

**3. Why did you choose a software-only project?**  
It can be built and demonstrated on a laptop without buying hardware, and it lets visitors test different scenarios safely.

**4. Which technologies did you use?**  
HTML, CSS, JavaScript, and Chart.js. The browser's speech-recognition feature is used optionally for voice commands.

**5. What is the role of HTML?**  
HTML creates the page structure, sections, buttons, sliders, labels, and input fields.

**6. What is the role of CSS?**  
CSS controls layout, colours, responsive design, animations, and visual appearance.

**7. What is the role of JavaScript?**  
JavaScript responds to user actions, updates the displayed values, applies rules, changes scenarios, and generates the demo assistant's answers.

**8. Is this a real AI system?**  
The assistant is a rule-based explainer, not a connected generative AI model. The project uses “AI” as a theme for demonstrating smart, automated decision support; it should not be described as a trained machine-learning model.

**9. How does traffic control work in the project?**  
The program checks the traffic slider value against preset thresholds and shows a recommendation. It does not control real traffic signals.

**10. What does AQI mean?**  
AQI means Air Quality Index. It is a way to communicate air-quality conditions. This project uses fictional sample values and illustrative categories.

**11. How does water management work?**  
The user changes the reservoir percentage. If it drops below the demo threshold, the program shows a low or critical reserve status and a conservation recommendation.

**12. What is a rule-based system?**  
It is a system that follows predefined conditions. For example, “if water is below 25%, show a critical-reserve alert.”

**13. What happens when an emergency incident is added?**  
A fictional incident is added to the queue, shown with a priority and a suggested workflow, and counted in the alert feed.

**14. Does it contact real emergency services?**  
No. It is only a school demonstration and does not contact any authority or service.

**15. Does it use real-time city data?**  
No. All readings and incidents are simulated.

## Deeper questions
**16. Why use charts?**  
Charts make it easier to compare multiple indicators quickly.

**17. What is the purpose of the chatbot?**  
It gives prepared explanations about the project's current demo values and helps visitors explore features.

**18. How do voice commands work?**  
In a supported browser, speech recognition converts a spoken phrase into text. JavaScript matches the phrase to a supported command and triggers a demo action. It may not work in every browser.

**19. Why is internet sometimes needed?**  
The chart library is loaded from a CDN, and browser speech recognition may depend on browser services. Most core simulation logic is local.

**20. What are the limitations?**  
The data is fictional, thresholds are illustrative, there are no sensors or live feeds, and the assistant only understands a limited set of topics.

**21. What would be needed for a real smart-city system?**  
Reliable sensors and data feeds, secure communications, privacy protections, robust software, testing, official standards, and trained human oversight.

**22. Could the system make a wrong recommendation?**  
Yes. This prototype has simple rules and simulated values. Real decisions need accurate data, validation, and expert review.

**23. How could you improve the project?**  
I could add validated public data, a database, multilingual support, better accessibility, and supervised sensor integration.

**24. What is the main learning outcome?**  
I learned how interface design, JavaScript logic, threshold rules, and visualisation can work together to explain a real-world problem.

**25. What is your conclusion?**  
A central dashboard can make sample information easier to understand, but real systems need trustworthy data, safety checks, and human decision-making.

## Extra questions (new features)
**26. Who made this project?**  
Naitik More, Arjun Patil, Vedant Patil, Sayyam Dangi and Zaid Sheikh.

**27. What does the Live sim button do?**  
It changes the traffic, AQI and water values by small random amounts every couple of seconds so we can see the rules and alerts react automatically. The numbers are random, not real.

**28. Why did you bundle Chart.js inside the folder?**  
So the chart still works at the exhibition even if there is no internet.

**29. How does the map show live status?**  
When a zone is clicked, JavaScript reads the current simulated value (traffic, AQI, water or incidents) and applies the same threshold rules to show a status.

**30. How does this relate to real cities?**  
Real smart cities use sensors and data to support decisions, which links to making cities safe and sustainable. Our project only simulates the software side.

## Quick tips for the exhibition
- Start by saying clearly that the data is simulated.
- Demonstrate one feature at a time rather than clicking rapidly.
- Explain the “if condition → recommendation” logic in your own words.
- If voice commands do not work, use the buttons; voice input is optional.
- Never claim the prototype monitors or controls an actual city.
