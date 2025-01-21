exports.home = (req, res) => {
    res.render("tasks/index")
}

exports.add = (req ,res ) => {
    res.render("tasks/new")
}