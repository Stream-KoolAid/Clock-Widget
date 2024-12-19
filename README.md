# Clock Widget for OBS ⏰

Easily display a customizable clock in your OBS streams! This widget allows you to create a clock overlay tailored to your style and preferences. Perfect for streamers looking to add a professional touch to their setup.

## Features ✨

- Fully customizable clock format. ⌚
- Adjustable font size, family, and weight. 🔷
- Control over text color, shadow, and transformation. 🖌️
- Works seamlessly with OBS browser sources. 🔍

## Quick Setup ⚙️

1. **Download or Use Hosted Version**:
   - You can download the `index.html` file from this repository and host it on your server or use it locally in OBS.
   - Alternatively, use the hosted version at: <a href="https://stream-koolaid.github.io/Clock-Widget/" target="_blank">Clock Widget Hosted Version</a>.
2. **Add to OBS**:
   - Open OBS. 📺
   - Add a **Browser Source** to your scene. 🔄
   - Set the URL to the hosted version or your local file path.
3. **Quick Customization**:
   - Use our <a href="http://yourdomain.com/setup" target="_blank">Quick Setup Page</a> to easily generate the query string for your desired customization without manual URL editing. 💡

## URL Customization ✍️

You can customize the clock using the following query parameters:

| Parameter | Description | Example Value |
| --- | --- | --- |
| `dateFormat` | Format of the date/time. | `MMMM Do YYYY h:mm:ss A` |
| `fontSize` | Size of the font. | `50px` |
| `fontFamily` | Font family. | `Verdana, sans-serif` |
| `fontWeight` | Font weight. | `700` |
| `textTransform` | Text transformation (e.g., capitalize, uppercase). | `capitalize` |
| `color` | Text color (in HEX). | `#ff0000` |
| `textShadow` | Shadow for the text. | `3px 3px 5px rgba(0, 0, 0, 0.7)` |

### Example URL 🔗

```
https://stream-koolaid.github.io/Clock-Widget?dateFormat=MMMM%20Do%20YYYY%20h:mm:ss%20A&fontSize=50px&fontFamily=Verdana%2C%20sans-serif&fontWeight=700&textTransform=capitalize&color=%23ff0000&textShadow=3px%203px%205px%20rgba(0%2C%200%2C%200%2C%200.7)
```

## Contributing ✨

We welcome contributions! Feel free to submit issues or pull requests to help improve this project.

## License 🔒

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Happy streaming! 🎮 If you encounter any issues or have suggestions, please let us know. 📢
