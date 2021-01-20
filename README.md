# Twilio-IVR-Chatbot
## Twilio + IVR-based chatbot that can easily be used by small business owners to improve their digital presence, attract more customers and enhance their customer support

### Structure
#### IVR
A IVR (interactive voice response) system using Twilio's Programmable API that get user's inquery and send it to endpoint then reply as the endpoint's response.
#### API
A api server that handle user's inquery based on store's information (discounts/promotions, open/close hours, product availability, etc.)
#### Console
A store owner's console that manage the customers' call and analyze of it (e.g. # of calls, popular inquery, etc)

### Prerequisite
- Node.js / Express
- MongoDB
- Twilio API and Account
- ngrok (for the testing localhost to public url)

### API Integration
- Google Speech-to-Text API (Speech-to-text) 
- Twilio Programmable Voice API (Text-to-speech)

## Useful links
- Jira: https://sem2020.atlassian.net
- Presentation 1: https://drive.google.com/file/d/1bOsTL60e4ApJeQRnzH3wfiA7by2j1X7S/view?ths=true

## Documentation
- Prototype data: https://docs.google.com/document/d/1ALToLIapH6hs1o0feYgMPNSRuJkrv7PsUEXWjMLnw80

### Architecture
![Architecture](./src/img/architecture.png)

### Reference
- Automating Customer Service with DeepPavlov: An End-To-End Solution, https://medium.com/deeppavlov/automating-customer-service-with-deeppavlov-an-end-to-end-solution-5887d0e5d61b
- Deep Pavlov Classfication Model, http://docs.deeppavlov.ai/en/master/features/models/classifiers.html#quick-start

### License
- MIT / Carnegie Mellon University - Silicon Valley

### Developers
- Ikwhan Chang
- Manuja Gokulan
- Wei Li
