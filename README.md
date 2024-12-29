# Clock Widget for OBS ⏰

Easily display a customizable clock in your OBS streams! This widget allows you to create a clock overlay tailored to your style and preferences. Perfect for streamers looking to add a professional touch to their setup.

## Features ✨

- Fully customizable clock format. ⌚
- Adjustable font size, family, and weight. 🔷
- Control over text color, shadow, and transformation. 🖌️
- Works seamlessly with OBS browser sources. 🔍

## Quick Setup ⚙️

1. **Download or Use Hosted Version**:
   - You can download the [`Clock Widget`](https://github.com/Stream-KoolAid/Clock-Widget/releases) file from this repository and host it on your server or use it locally in OBS.
   - Alternatively, use the hosted version at: [Clock Widget Hosted Version](https://stream-koolaid.github.io/Clock-Widget/widget/clock.html).
2. **Add to OBS**:
   - Open OBS. 📺
   - Add a **Browser Source** to your scene. 🔄
   - Set the URL to the hosted version or your local file path.
3. **Quick Customization**:
   - Use our [Quick Setup Page](https://stream-koolaid.github.io/Clock-Widget) to easily generate the query string for your desired customization without manual URL editing. 💡

## URL Customization ✍️

Some customization options are still available as URL query parameters:

| Parameter    | Description              | Example Value            |
| ------------ | ------------------------ | ------------------------ |
| `dateFormat` | Format of the date/time. | `MMMM Do YYYY h:mm:ss A` |
| `fontFamily` | Font family.             | `Verdana`                |

### Example URL 🔗

```
https://stream-koolaid.github.io/Clock-Widget/widget/clock.html?dateFormat=MMMM%20Do%20YYYY%20h:mm:ss%20A&fontFamily=Verdana
```

## Customization with CSS 🌱

As of the latest update, most text styling is now managed via CSS custom properties. This provides greater flexibility and control over the appearance of your clock widget. Customize the following variables in the `:root` selector:

### Available CSS Variables

| Variable | Description | Default Value |
| --- | --- | --- |
| `--letter-spacing` | Spacing between letters. | `0px` |
| `--font-size` | Size of the font. | `40px` |
| `--font-weight` | Font weight. | `600` |
| `--text-transform` | Text transformation (e.g., capitalize, uppercase). | `uppercase` |
| `--text-color` | Text color. | `#fff` |
| `--text-shadow` | Shadow for the text. | `2px 2px 2px rgba(0, 0, 0, 1)` |

```css
:root {
	--letter-spacing: 0px;
	--font-size: 40px;
	--font-weight: 600;
	--text-transform: uppercase;
	--text-color: #fff;
	--text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
}
```

## Contributing ✨

We welcome contributions! Feel free to submit issues or pull requests to help improve this project.

## License 🔒

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Happy streaming! 🎮 If you encounter any issues or have suggestions, please let us know. 📢
