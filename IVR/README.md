# Definition of API

## Postman colection for testing the routes
https://www.getpostman.com/collections/84332a26255f0b049e4d

### Route: POST /getResponse
- Send paramters in the body of the request in JSON format
```
{
    "input": "********",
    "email": "abc@test.com"
}
```
- API response is in the format of JSON object
```
{
    "response": "********"
}
```

### Route POST /signup


## Supported category
- Get menu
- Get inventory
- Get store hour
- Get promotion

## Database schema design
- Store
  - Id
  - Name
  - MenuLink
  - Address
- StoreHour
  - StoreId
  - DayOfWeek
  - StartHour
  - EndHour
- Promotion
  - StoreId
  - StartDate
  - EndDate
  - Item
  - Discount
- Inventory
  - StoreId
  - need more discussion, maybe interfacing with the store inventory system?

## Sample questions
### Menu
- Hi, do you have the store menu?
- Can I have the store menu?

### Inventory
- Hi, do you have vanilla icecream in the store?

### Store hour
- Hi, is it open right now?
- When do you close?
- Is the store open today?

### Promotion
- Do you have any discount on fruits?
- Is there any promotion with milktea?

## Dev log
- 10/24/2020: The inventory checking is a bit tricky right now. Need to do some NLP processing to figure out what item the customer is asking about.