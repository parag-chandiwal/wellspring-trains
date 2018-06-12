# Wellspring Coding Exercise

> Program that reads in a ‘comma separated values’ (CSV) file containing train information and outputs the data to the user.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes.

## Live Demo
Live Demo at: [chandiwal.com](http://chandiwal.com/wellspring)

### Prerequisites
Browser: 
```
- Google Chrome
- FireFox
```
CSV File:
Download CSV File here: [Trains.csv](http://chandiwal.com/wellspring/data/trains.csv)


### Deployment
Open index.html in supported browsers

### Requirements
- Each row of the CSV will contain data for the following fields:
    -Train Line (El, Metra, Amtrak)
    -Route Name (i.e., Brown Line)
    -Run Number
    -Operator ID
- The first row of the CSV will always be a header row specifying the field names for each
of the columns
- Each line of the CSV will end with a combination of a carriage return and a line feed:
\r\n

### Additional Requirements
- Allow users to upload the CSV file
- Display the data in the specified format as the content of a web page
- All entries displayed must be unique
- Output should be sorted in alphabetical order by Run Number

### Bonus
- Add pagination controls which show 5 valid data items per page Add sorting by any column
- Set up CRUD (Create, Read, Update, Delete) functionality
- Set up hosting and provide a link along with your code

## Technologies Used
- JavaScript
- HTML5
- Database: IndexedDB API

### Dependencies
- Bootstrap
- Papaparse.js
- jquery-1.11.1.min.js
