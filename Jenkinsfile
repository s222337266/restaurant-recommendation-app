pipeline {
    agent any

    environment {
        // Define any environment variables here
        BUILD_DIR = 'build' // Directory where the build artifacts will be created
        SONAR_TOKEN = "sqa_15771b5e67dfbcf6d6cf73049e646e1c14f9c464"
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Install dependencies
                    bat 'npm install'

                    // Run build script
                    bat 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests
                    // If you have tests, this is where you would run them
                    // For example: `sh 'npm test'`
                    bat 'npm test'
                }
            }
        }
        // stage('Code Quality Analysis') {
        //     tools {
        //         jdk "jdk17" // the name you have given the JDK installation using the JDK manager (Global Tool Configuration)
        //     }
        //     steps {
        //         echo "Perfoming code analyses using SonarQube.."
        //         echo 'Tool: SonarScanner'
        //         echo "mvn sonar:sonar -Dsonar.token=${SONAR_TOKEN}"            
        //     }
        // }
        stage('Code Analysis') {
            tools {
                jdk "jdk17" // the name you have given the JDK installation using the JDK manager (Global Tool Configuration)
            }
            environment {
                scannerHome = tool 'Sonar'
            }
            steps {
                // Analyze the code using SonarQube
                // bat 'sonar-scanner'
                // withSonarQubeEnv(installationName : 'sq1'){
                script {
                    withSonarQubeEnv('sq1') {
                        bat  "${scannerHome}/bin/sonar-scanner\
                                -Dsonar.token=${SONAR_TOKEN}"
                        //bat "mvn sonar:sonar -Dsonar.token=${SONAR_TOKEN}"
                        // bat "mvn sonar:sonar"
                        // bat 'mvn clean org.sonarsource.scanner.maven:sonar-maven-plugin:3.11.0.3922:sonar'
                    }                
                }
            }
        }
        stage('Deploy to Test Environment') {
            steps {
                script {
                    // Deploy to a test environment
                    // For simplicity, we’ll just print the message
                    echo 'Deploying to test environment...'
                }
            }
        }
        stage('Release to Production') {
            steps {
                script {
                    // Release to production
                    // This could involve more complex deployment steps
                    echo 'Releasing to production...'
                    // Example: `sh 'deploy_to_production_script.sh'`
                }
            }
        }
    }

    post {
        always {
            // Clean up steps, notifications, etc.
            echo 'Pipeline finished.'
        }
    }
}
