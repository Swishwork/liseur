# E2E Test: CSV Export Functionality

Test the CSV export functionality for both tables and query results in the Natural Language SQL Interface application.

## User Story

As a data analyst  
I want to export tables and query results as CSV files with one click  
So that I can use the data in other applications and share it with my team

## Test Steps

1. Navigate to the `Application URL`
2. Take a screenshot of the initial state
3. **Verify** the page title is "Natural Language SQL Interface"
4. **Verify** Available Tables section is present
5. **Verify** download buttons appear to the left of the × icon for each table
6. Take a screenshot showing download buttons next to tables

### Test Table Export
7. Click the download button for the first available table
8. **Verify** a CSV file download is initiated (check for file download)
9. **Verify** the downloaded file has a CSV extension and descriptive name

### Test Query Result Export
10. Enter the query: "Show me all data from the first available table"
11. Click the Query button
12. **Verify** query results appear
13. **Verify** a download button appears to the left of the Hide button
14. Take a screenshot showing the download button next to Hide button
15. Click the download button for query results
16. **Verify** a CSV file download is initiated
17. **Verify** the downloaded file contains the query results

### Test Error Handling
18. Attempt to export from a non-existent table (if applicable)
19. **Verify** appropriate error message is displayed
20. Take a screenshot of any error messages

## Success Criteria
- Download buttons are visible for all tables (to the left of × icon)
- Download button is visible for query results (to the left of Hide button)
- Table export triggers CSV download
- Query result export triggers CSV download
- CSV files have descriptive names
- Downloads occur without page refresh
- Error handling works appropriately
- 4 screenshots are taken