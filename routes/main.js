
module.exports = {
    main: (req, res) => {
        return res.status(200).json({
            data: "Root URL",
        });
    },
};
