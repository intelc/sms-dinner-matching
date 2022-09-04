# sms-dinner-matching
Text anything to (814)885-4058 to try our app!

!["pic1"](/public/pennapps1.png)
## Inspiration
For many college students, finding time to socialize and make new friends is hard. Everyone's schedule seems perpetually busy, and arranging a dinner chat with someone you know can be a hard and unrewarding task. At the same time, however, having dinner alone is definitely not a rare thing. We've probably all had the experience of having social energy on a particular day, but it's too late to put anything on the calendar. Our SMS dinner matching project exactly aims to **address the missed socializing opportunities in impromptu same-day dinner arrangements**. Starting from a basic dining-hall dinner matching tool for Penn students only, we **envision an event-centered, multi-channel social platform** that would make organizing events among friend groups, hobby groups, and nearby strangers effortless and sustainable in the long term for its users.

!["pic2"](/public/pennapps2.png)
## What it does
Our current MVP, built entirely within the timeframe of this hackathon, allows users to interact with our web server via **SMS text messages** and get **matched to other users for dinner** on the same day based on dining preferences and time availabilities.
!["pic3"](/public/pennapps3.png)
### The user journey:
1. User texts anything to our SMS number
2. Server responds with a welcome message and lists out Penn's 5 dining halls for the user to choose from
3. The user texts a list of numbers corresponding to the dining halls the user wants to have dinner at
5. The server sends the user input parsing result to the user and then asks the user to choose between 7 time slots (every 30 minutes between 5:00 pm and 8:00 pm) to meet with their dinner buddy
6. The user texts a list of numbers corresponding to the available time slots
7. The server attempts to match the user with another user. If no match is currently found, the server sends a text to the user confirming that matching is ongoing. If a match is found, the server sends the matched dinner time and location, as well as the phone number of the matched user, to each of the two users matched
8. The user can either choose to confirm or decline the match
9. If the user confirms the match, the server sends the user a confirmation message; and if the other user hasn't confirmed, notifies the other user that their buddy has already confirmed the match
10. If both users in the match confirm, the server sends a final dinner arrangement confirmed message to both users
11. If a user decides to decline, a message will be sent to the other user that the server is working on making a different match
12. 30 minutes before the arranged time, the server sends each user a reminder

!["pic4"](/public/pennapps4.png)
###Other notable backend features
1. The server conducts user input validation for each user text to the server; if the user input is invalid, it sends an error message to the user asking the user to enter again
2. The database maintains all requests and dinner matches made on that day; at 12:00 am each day, the server moves all requests and matches to a separate archive database

## How we built it
We used the Node.js framework and built an Express.js web server connected to a hosted MongoDB instance via Mongoose. 
We used Twilio Node.js SDK to send and receive SMS text messages.
We used Cron for time-based tasks.
Our notable abstracted functionality modules include routes and the main web app to handle SMS webhook, a session manager that contains our main business logic, a send module that constructs text messages to send to users, time-based task modules, and MongoDB schema modules.

## Challenges we ran into
Writing and debugging async functions poses an additional challenge. Keeping track of potentially concurrent interaction with multiple users also required additional design work.

## Accomplishments that we're proud of
Our main design principle for this project is to keep the application **simple and accessible**. Compared with other common approaches that require users to download an app and register before they can start using the service, using our tool requires **minimal effort**. The user can easily start using our tool even on a busy day.
In terms of architecture, we built a **well-abstracted modern web application** that can be easily modified for new features and can become **highly scalable** without significant additional effort (by converting the current web server into the AWS Lambda framework).

## What we learned
1. How to use asynchronous functions to build a server - multi-client web application
2. How to use posts and webhooks to send and receive information
3. How to build a MongoDB-backed web application via Mongoose
4. How to use Cron to automate time-sensitive workflows

## What's next for SMS dinner matching
### Short-term feature expansion plan
1. Expand location options to all UCity restaurants by enabling users to search locations by name
2. Build a light-weight mobile app that operates in parallel with the SMS service as the basis to expand with more features
3. Implement friend group features to allow making dinner arrangements with friends
###Architecture optimization
1. Convert to AWS Lamdba serverless framework to ensure application scalability and reduce hosting cost
2. Use MongoDB indexes and additional data structures to optimize Cron workflow and reduce the number of times we need to run time-based queries
### Long-term vision
1. Expand to general event-making beyond just making dinner arrangements
2. Create explore (even list) functionality and event feed based on user profile
3. Expand to the general population beyond Penn students; event matching will be based on the users' preferences, location, and friend groups
