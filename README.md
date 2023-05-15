
Web app designed to simulate a rewards pragram incentivizing safe driving for truck drivers.
Hosted in cloud.
Connected to DB.
Public API.
Managed using Azure Dev Ops.
Git for version control linked to Dev Ops.
 
    Uses: 
        React/Javascript, 
        Material UI,
        Python/Flask, 
        MySql.

    Implementations: 
        Parameterized Queries to protect against SQL injections, 
        Password Hashing,
        Error Checking in API,
        Implemented Material UI which goes by industry standards of Material Design for accessibility, 
        Sent reports over the network by utilizing matplotlib. 
 
    Application Specifics: 
        3 Users (drivers, sponsors, Administrators).
        Each user has:
            Operations specific to their type.
            Operations that overlap.
    
        Each driver can have 1 sponsor,
        Drivers can use points to purchase items from sponsor,
        Needs to conform to size of users' display,
        Secure sensitive info,
        Password reset program,
        Needs deployment process for AWS,
        Users login without specifying their user type,
        No user should need an ID number to do anything,
        Password complexity system,
        Encrypt users' passwords/private info,
        SQLi protection.
    
    Needs audit log:
    
    Applications:
        Date,
        Sponsor,
        Driver,
        Status (accept/reject),
        Reason.
    
    Point changes:
        Date,
        Sponsor,
        Driver,
        # of points,
        reason.
    
    Password changes:
    
    Login attempts:
 
    Reporting:
        Need to be visually appealing.
        Our customer ikes graphs and colors.
        Invoice for every customer.
 
    Drivers:
        Can log in,
        Drivers "apply" to join a sponsor program,
        Review/update profile and password,
        Browse sponsors products,
        Review point status,
        Review purchases,
        Cancel/update purchases.
 
    Sponsors:
        Sponsors (companies) award points to drivers for good behavior.
        Points can be added via recurring program or on demand.
        Sponsors take away points for bad behavior.
        Have catalog of safe for work products.
        Make catalog using a public API (Etsy or eBay are examples).
        Products have $$$ value that corresponds to driver points.
        Can log in.
        Review/update the sponsor and user profiles.
        Multiple logins per sponsor.
        Create new sponsor accounts.
        View status of drivers.
        Approve/reject sponsor applications from drivers.
        Update driver information.
        Update product catalog.
        Purchase items on behalf of a driver.
        Update rules for generating product catalog.
        Generate sponsor specific reports (details to come later).
 
    Admins:
        Log in.
        Update admin profile.
        Can basically do anything.
        Products are sold and delivered via the store associated with the API we choose.
        We receive 1% of sales each month.
        
        
        
        
        
![unnamed (1)](https://user-images.githubusercontent.com/98988760/210686387-52864941-3890-4130-85dd-fe4df7d2a026.png)
    
![unnamed (2)](https://user-images.githubusercontent.com/98988760/210686461-e9337e14-a078-470c-900c-fc44900ae8a7.png)

![unnamed (3)](https://user-images.githubusercontent.com/98988760/210686524-380356b7-de22-4955-85dd-c5491d3f0a99.png)
    
    

