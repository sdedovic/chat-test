module.exports = function(grunt) {

	grunt.config.set('babel', {
		dev: {
	        files: [{
	        	"expand": true,
	            "cwd": "assets/jsx/",
	            "src": ["**/*.jsx"],
	            "dest": ".tmp/public/js/",
				"ext": ".js"
			}]
		}
	});

	grunt.loadNpmTasks('grunt-babel');
};