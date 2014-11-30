module.exports = function(grunt) {  
   
    grunt.initConfig({   
		pkg: grunt.file.readJSON('package.json'),
   
        //our uglify options  
        uglify: {  
			options: {
				banner: '/*! <%= pkg.name %> V<%= pkg.version %> | <%= pkg.description %> | MIT License | By: <%= pkg.author %> | <%= pkg.homepage %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
            js: {  
                files: {   
                    'js/feloader-<%= pkg.version %>.min.js': ['src/feloader.js'] //save over the newly created script  
                }  
            } 
        }  
   
    });  
   
    //load our tasks  
    //grunt.loadNpmTasks('grunt-contrib-jshint');  
    //grunt.loadNpmTasks('grunt-contrib-concat');  
    grunt.loadNpmTasks('grunt-contrib-uglify');  
   
    // default tasks to run  
    // grunt.registerTask('default', ['jshint', 'concat', 'uglify']);  
    //grunt.registerTask('development', ['jshint']);  
    //grunt.registerTask('production', ['jshint', 'concat', 'uglify']);  
    grunt.registerTask('production', ['uglify']);  
};