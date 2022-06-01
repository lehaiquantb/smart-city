pipeline{
    agent any
    stages{

        stage('Checkout'){
            steps{
                git branch: 'main', url: 'https://github.com/lehaiquantb/smart-city'
        
            }
        }

        stage('Test'){
            steps{
                echo 'test1'
            }
        }
            
        stage('Build'){
            steps{
                echo 'build'
            }
        }
            
        stage('Deploy'){
            steps{
                echo 'start deploy ...'
            }
        }
    }
}