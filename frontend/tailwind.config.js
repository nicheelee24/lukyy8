/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                "3xl": "0px 5px 60px 15px rgba(0, 0, 0, 0.3)",
            },
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                xxlg: "1400px",
                "2xl": "1536px",
                xlg: "1600px",
                xxlg: "1900px"
            },
        },
        minWidth: {
            8: "32px",
        },
    },
    plugins: [],
});
