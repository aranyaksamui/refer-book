// Get home page
export const getHomePage = (req, res) => {
    // Render user
    let email = "";
    if (req.user) email = req.user.email;

    // Rendering home page with data
    res.render("home.ejs", { appName: "REFER BOOK", isLoggedIn: req.isAuthenticated(), userEmail: email});
};

// Sample protected route
export const getProtectedRoute = (req, res) => {
    res.send(req.user.email);
};