(function() {
	const stableVersion = $("#stable_version");

	if (stableVersion.length) {
		$.getJSON("https://api.github.com/repos/thelounge/lounge/releases", function(json) {
			var latest = json[0];
			var stable;
			var prerelease;

			if (latest.prerelease) {
				prerelease = latest;
				stable = json.find(function (release) { return !release.prerelease; });
			} else {
				stable = latest;
			}

			// `.substr(1)` strips `v` in `vX.Y.Z`
			stableVersion.text("version " + stable.tag_name.substr(1) + (prerelease ? " (stable)" : ""));

			if (prerelease) {
				$("#prerelease_version").text("version " + prerelease.tag_name.substr(1) + " (pre-release)");
				$("#prerelease_card").removeClass("hidden");
			}
		});
	}

	$("#search-btn").click(function(event) {
		if (!$("#search-input").hasClass("active")) {
			$(".search > div").addClass("active");
			$(".search > div").one("transitionend webkitTransitionEnd oTransitionEnd", function () {
				console.log('transitionend');
				$("#search-input").focus();
			});
			event.preventDefault();
		}
	});

	$("#cancel-btn").click(function(event) {
		$(".search > div").removeClass("active");
		$(".search > div").one("transitionend webkitTransitionEnd oTransitionEnd", function () {
			$("#search-input").val("");
			$("#search-input").trigger("keyup");
		});

		event.preventDefault();
	});

	$(document).keypress(function (e) {
		if (e.which === 115) { // "S" key
			$("#search-btn").click();
		}
	});

	$("#search-input").keydown(function (e) {
		if (e.which === 27) { // "Escape" key
			$("#cancel-btn").click();
		}
	});
})();

// Add an anchor link to the page headers to create a shareable URL
(function() {
	$("#main h2, #main h3").each(function() {
		$(this).prepend($(
			`<a class="link-anchor" href="#${$(this).attr("id")}">` +
				'<i class="fas fa-link" aria-hidden="true"></i>' +
			'</a>'
		));
	});
})();
