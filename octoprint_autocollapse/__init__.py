# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class AutocollapsePlugin(octoprint.plugin.SettingsPlugin,
                         octoprint.plugin.AssetPlugin,
                         octoprint.plugin.TemplatePlugin):

	def get_settings_defaults(self):
		return dict(
			initialTimeout=30,
		)

	def get_template_configs(self):
		return [
			dict(type="settings", custom_bindings=False, name="Auto Collapse Files")
		]

	def get_assets(self):
		return dict(
			js=["js/autocollapse.js"],
			css=["css/autocollapse.css"],
			less=["less/autocollapse.less"]
		)
		
	def on_settings_save(self, data):
		s = self._settings
		if "initialTimeout" in data.keys():
			s.setInt(["initialTimeout"], data["initialTimeout"])
		self.on_settings_cleanup()
		s.save()

	#function stolen...err borrowed :D from types.py @ 1663
	def on_settings_cleanup(self):
		import octoprint.util
		from octoprint.settings import NoSuchSettingsPath

		try:
			config = self._settings.get_all_data(merged=False, incl_defaults=False, error_on_path=True)
		except NoSuchSettingsPath:
			return

		if config is None:
			self._settings.clean_all_data()
			return

		if self.config_version_key in config and config[self.config_version_key] is None:
			del config[self.config_version_key]

		defaults = self.get_settings_defaults()
		diff = octoprint.util.dict_minimal_mergediff(defaults, config)

		if not diff:
			self._settings.clean_all_data()
		else:
			self._settings.set([], diff)

	def get_update_information(self):
		return dict(
			autocollapse=dict(
				displayName="Autocollapse Plugin",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="ntoff",
				repo="OctoPrint-AutoCollapse",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/ntoff/OctoPrint-AutoCollapse/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "Auto Collapse Files"
__plugin_description__ = "Auto collapse the files accordion after loading the UI"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = AutocollapsePlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}

