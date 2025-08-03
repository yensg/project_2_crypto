## Planning Stage

- Understand the API dictionary nature and data format to see what kind of details to provide
  - `Postman`
- Breakdown components into 2 parts
  - Feature components
    - This is what feature we want to provide and can start working on them concurrently
    - Example will be search feature
  - Functional components
    - These are the reuseable components such as button and input text etc.
- Can design the outlay of the app to position the components in their efficient and meaningful positions
- To draw out DOM tree diagram to see which data should be stored for easier lifting state and props.
  - Most of the data will be taken via the API directly so this lifting state and props should be minimal.

## Package Installation

- Install relevant packages to ensure efficient coding
  - `npm i`
  - `npm i react-router-dom`
  - `npm i @tanstack/react-query`
  - `.env`

## Positional coding

- Understanding which child components reside in which parent components are important to user experience
  - I position the components in a way that follows a logical flow for every user to use without much explanation.
  - The downside might be too structured and user cant customise what they want the App to behave.
  - Hence, i created `main tab` as the structured approach and `favourite tab` as the customised approach.
    - `main tab`: what i want user to see.
    - `favourite tab`: what coins that user want to keep track

## App Development

![[asset/InitialLayout.png]]

### Initial outlook

- Example of how the positions of each component should reside.
  - I customised bootstrap borders using useContext so that can i easily assign border colours to the components.

### Fetching Data issues

- Needed to fetch data multiple times using different endpoints.
- Needed to fetch data from endpoints without API dictionary.
