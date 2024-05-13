"use strict";

{
	// Update the DOM_COMPONENT_ID to be unique to your plugin.
	// It must match the value set in instance.js as well.
	const DOM_COMPONENT_ID = "MyCompany_DOMMessaging";

	// This class handles messages from the runtime, which may be in a Web Worker.
	const HANDLER_CLASS = class ExampleDOMHandler extends self.DOMHandler
	{
		constructor(iRuntime)
		{
			super(iRuntime, DOM_COMPONENT_ID);
			
			// This provides a table of message names to functions to call for those messages.
			// For example the "Set document title" action posts a "set-document-title" message,
			// which will then call _OnSetDocumentTitle().
			this.AddRuntimeMessageHandlers([
				["get-initial-state",		() => this._OnGetInitialState()],
				["set-document-title",		e => this._OnSetDocumentTitle(e)]
			]);
		}
		
		_OnGetInitialState()
		{
			// Return the initial document title so the DocumentTitle expression has the right
			// value on startup. The return value of this method will be what the PostToDOMAsync()
			// promise resolves to.
			return {
				"document-title": document.title
			};
		}

		// Called by the 'Set document title' action. Since this script is always in the DOM,
		// the document.title property can be accessed directly, and updated with the title
		// sent from the action.
		_OnSetDocumentTitle(e)
		{
			document.title = e["title"];
		}
	};

	self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}