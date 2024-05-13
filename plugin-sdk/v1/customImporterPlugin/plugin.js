
const SDK = self.SDK;

////////////////////////////////////////////
// The plugin ID is how Construct identifies different kinds of plugins.
// *** NEVER CHANGE THE PLUGIN ID! ***
// If you change the plugin ID after releasing the plugin, Construct will think it is an entirely different
// plugin and assume it is incompatible with the old one, and YOU WILL BREAK ALL EXISTING PROJECTS USING THE PLUGIN.
// Only the plugin name is displayed in the editor, so to rename your plugin change the name but NOT the ID.
// If you want to completely replace a plugin, make it deprecated (it will be hidden but old projects keep working),
// and create an entirely new plugin with a different plugin ID.
const PLUGIN_ID = "MyCompany_CustomImporter";
////////////////////////////////////////////

const PLUGIN_VERSION = "1.0.0.0";
const PLUGIN_CATEGORY = "general";

// This is the callback passed to AddDragDropFileImportHandler(). Note it is an async function and
// must return with 'true' if it recognised and handled the data, else 'false'.
async function HandleDataInMyFormat(droppedFileName, zipFile, opts)
{
	// Look for a data.json entry in the zip file. If it's missing, return false to indicate this format
	// isn't recognised by this handler.
	const entry = zipFile.GetEntry("data.json");
	if (!entry)
		return false;
	
	// Read the data.json entry from the zip in JSON format. It's sensible to have some kind of flag
	// in the JSON to clearly identify the specific format we want to read in this handler, so we don't
	// get confused with any other data formats that might happen to also involve a file called data.json
	// in a zip. So if the "is-my-custom-format" key is missing from the JSON, return false.
	const json = await zipFile.ReadJson(entry);
	if (!json["is-my-custom-format"])
		return false;		// data.json does not look like it's in the right format
	
	// Iterate each entry in the "sprites" array and import them in parallel.
	const promises = [];
	
	for (const spriteData of json["sprites"])
	{
		promises.push(ImportSpriteData(zipFile, opts, spriteData));
	}
	
	// Wait for each sprite import to finish.
	await Promise.all(promises);
	
	// Return true to indicate that the data was recognised and imported.
	return true;
}

// This function is called for each entry in the "sprites" array in data.json.
// It imports a single sprite entry. Note it's async and runs in parallel to all other imports.
async function ImportSpriteData(zipFile, opts, spriteData)
{
	// Read the basic details about the drop location and the relevant project.
	const layoutView = opts.layoutView;
	const project = layoutView.GetProject();
	const layoutX = opts.layoutX;
	const layoutY = opts.layoutY;
	
	// Read the sprite entry data from the JSON.
	const filename = spriteData["file"];
	const x = layoutX + spriteData["offsetX"];
	const y = layoutY + spriteData["offsetY"];
	const width = spriteData["width"];
	const height = spriteData["height"];
	const angle = spriteData["angle"] * (Math.PI / 180);	// convert to radians
	
	// Look for the given filename in the zip file.
	const imageEntry = zipFile.GetEntry(filename);
	if (!imageEntry)
		return;				// referenced filename is missing in zip
	
	// If the file exists, read the referenced image file as a Blob.
	const imageBlob = await zipFile.ReadBlob(imageEntry);
	
	// Create a new Sprite object type. Use the name of the image file without the extension
	// as the name of the object type (but note Construct might rename it if it's already in use).
	const name = filename.split(".")[0];
	const objectType = await project.CreateObjectType("Sprite", name);
	
	// Get the first animation frame in the new object type.
	const animations = objectType.GetAnimations();
	const firstAnim = animations[0];
	const frames = firstAnim.GetFrames();
	const firstFrame = frames[0];
	
	// Replace the content of this frame with the image file's blob.
	await firstFrame.ReplaceBlobAndDecode(imageBlob);
	
	// Now create a sprite instance for this object type in the layout. Set the size and angle from
	// the JSON data, and position it relative to the drop position in the layout.
	const wi = objectType.CreateWorldInstance(layoutView.GetActiveLayer());
	wi.SetXY(x, y);
	wi.SetSize(width, height);
	wi.SetAngle(angle);
}

const PLUGIN_CLASS = SDK.Plugins.MyCompany_CustomImporter = class MyCustomImporterPlugin extends SDK.IPluginBase
{
	constructor()
	{
		super(PLUGIN_ID);
		
		SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());
		
		this._info.SetName(self.lang(".name"));
		this._info.SetDescription(self.lang(".description"));
		this._info.SetVersion(PLUGIN_VERSION);
		this._info.SetCategory(PLUGIN_CATEGORY);
		this._info.SetAuthor("Scirra");
		this._info.SetHelpUrl(self.lang(".help-url"));
		this._info.SetIsSingleGlobal(true);
		
		SDK.Lang.PushContext(".properties");
		
		this._info.SetProperties([
			new SDK.PluginProperty("integer", "test-property", 0)
		]);
		
		SDK.Lang.PopContext();		// .properties
		
		SDK.Lang.PopContext();
		
		// This is the main entry point to the Custom Importer API. This registers a callback to handle
		// files that are drag-and-dropped in to the Construct 3 window that nothing else recognises.
		SDK.UI.Util.AddDragDropFileImportHandler(HandleDataInMyFormat, {
			isZipFormat: true,			// second callback parameter will be IZipFile
			toLayoutView: true			// third callback parameter will have layout view related info
		});
	}
};

PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
