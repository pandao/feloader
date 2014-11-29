module.exports = function(grunt) {  
   
    grunt.initConfig({   
		pkg: grunt.file.readJSON('package.json'),
   
        //our uglify options  
        uglify: {  
			options: {
				banner: '/*! <%= pkg.file %> | a simple front-end file/Resources (queue) loader | MIT License | By: Pandao | E-mail: pandao@vip.qq.com | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
            js: {  
                files: {  
                    'js/feloader-1.0.0.min.js': ['src/feloader-1.0.0.js'] //save over the newly created script  
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