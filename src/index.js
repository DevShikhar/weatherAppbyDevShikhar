import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import hbs from "hbs";
import axios from "axios";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicdirpath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicdirpath));

app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather App",
		owner: "DevShikhar",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "Weather App",
		owner: "DevShikhar",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Weather App",
		owner: "DevShikhar",
	});
});

app.get("/weather", (req, res) => {
	const city = req.query.city;
	async function getWeather(city) {
		const url = "http://api.weatherstack.com/current";
		try {
			const response = await axios.get(url, {
				params: {
					access_key: "9bbe1648022ab49f2015959d1fd2164c",
					query: encodeURIComponent(city),
					limit: 1,
				},
			});
			if (response.data.success === false) {
				throw new Error(`${city} not found`);
			} else {
				const weth = response.data;
				// console.log(weth);
				// const weather_string = `Weather in ${weth.location.name} is ${
				// 	weth.current.weather_descriptions[0]
				// }. It is currently ${
				// 	weth.current.is_day === "no" ? "night" : "day"
				// }. Wind speed: ${weth.current.wind_speed}. Wind direction: ${
				// 	weth.current.wind_dir
				// }. Tempreture feels like: ${weth.current.feelslike}°C.`;
				// console.log(weather_string);
				// res.send(weather_string);
				res.render("weather", {
					wethimg: weth.current.weather_icons[0],
					city: weth.request.query,
					tempreture: weth.current.feelslike,
					windDirection: weth.current.wind_dir,
					weatherDesc: weth.current.weather_descriptions[0],
				});
			}
		} catch (e) {
			if (e.request) {
				console.log("Unable to connect to API");
				res.render("weather", {
					emsg: "Unable to connect to API",
				});
			} else if (e) {
				console.log(e);
				res.render("weather", {
					emsg: e,
				});
			}
		}
	}
	getWeather(city);
});

app.get("/products", (req, res) => {
	res.send({
		products: [],
	});
});

app.get("*", (req, res) => {
	res.render("404");
});

/************************************************************* */
app.listen(3000, () => {
	console.log("Server is up on port 3000.Enjoy");
});
/************************************************************* */

// app.get("/", (req, res) => {
// 	res.send("<h1>Hello from Express</h1>");
// });

// app.get("/help", (req, res) => {
// 	res.send([
// 		{
// 			fname: "Shikhar",
// 			age: 23,
// 		},
// 		{
// 			fname: "shubham",
// 			age: 27,
// 		},
// 	]);
// });

// app.get("/about", (req, res) => {
// 	res.send("This is about");
// });
