/*
 * View model for OctoPrint-AutoCollapse
 *
 * Author: ntoff
 * License: AGPLv3
 */
$(function() {
    function AutocollapseViewModel(parameters) {
        var self = this;
        'use strict';
        self.settings = parameters[0];
        //self.state = parameters[1];

        function collapseFiles(timeout) {
            var timeout = timeout;
                self.timerCollapse = setTimeout(function() {
                    if (!$("#files_wrapper .accordion-toggle").hasClass("collapsed")){
                        $("#files_wrapper .accordion-toggle").click();
                    }
                }, timeout*1000);
        }
        self.onBeforeBinding = function () {
            var timeout = parseInt(self.settings.settings.plugins.autocollapse.initialTimeout());
            if (timeout == 0) { 
                console.log("Files accordion auto collapse is disabled.");
                return 
            } else {
                collapseFiles(timeout);
            }
        }

        self.onSettingsHidden = function () {
            var timeout = parseInt(self.settings.settings.plugins.autocollapse.initialTimeout());
        }
        
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: AutocollapseViewModel,
        dependencies: [ "settingsViewModel"/*, "printerStateViewModel" */],
        elements: [ /* ... */ ]
    });
});
