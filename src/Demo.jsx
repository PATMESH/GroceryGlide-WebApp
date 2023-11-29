import React, { useState } from 'react';
import Select from 'react-select';

const Demo = () => {
    const skillOptions = [
        { value: 'js', label: 'JavaScript' },
        { value: 'java', label: 'Java' },
        { value: 'node', label: 'Node.js' },
        { value: 'reactjs', label: 'React.js' },
        { value: 'ai', label: 'Artificial Intelligence' },
        { value: 'ml', label: 'Machine Learning' },
        { value: 'python', label: 'Python' },
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'angular', label: 'Angular' },
        { value: 'vuejs', label: 'Vue.js' },
        { value: 'sql', label: 'SQL' },
        { value: 'php', label: 'PHP' },
        { value: 'ruby', label: 'Ruby' },
        { value: 'swift', label: 'Swift' },
        { value: 'android', label: 'Android' },
        { value: 'ios', label: 'iOS' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'csharp', label: 'C#' },
        { value: 'docker', label: 'Docker' },
        { value: 'kotlin', label: 'Kotlin' },
        { value: 'git', label: 'Git' },
        { value: 'mongodb', label: 'MongoDB' },
        { value: 'redux', label: 'Redux' },
        { value: 'graphql', label: 'GraphQL' },
        { value: 'angularjs', label: 'AngularJS' },
        { value: 'rust', label: 'Rust' },
        { value: 'scala', label: 'Scala' },
        { value: 'go', label: 'Go' },
        { value: 'spring', label: 'Spring Framework' },
        { value: 'django', label: 'Django' },
        { value: 'flask', label: 'Flask' },
        { value: 'laravel', label: 'Laravel' },
        { value: 'wordpress', label: 'WordPress' },
        { value: 'express', label: 'Express.js' },
        { value: 'jquery', label: 'jQuery' },
        { value: 'bootstrap', label: 'Bootstrap' },
        { value: 'storybook', label: 'Storybook' },
        { value: 'jenkins', label: 'Jenkins' },
        { value: 'aws', label: 'Amazon Web Services (AWS)' },
        { value: 'azure', label: 'Microsoft Azure' },
        { value: 'heroku', label: 'Heroku' },
        { value: 'netlify', label: 'Netlify' },
        { value: 'redux-saga', label: 'Redux Saga' },
        { value: 'nextjs', label: 'Next.js' },
        { value: 'gatsby', label: 'Gatsby' },
        { value: 'springboot', label: 'Spring Boot' },
        { value: 'reactnative', label: 'React Native' },
        { value: 'pythondjango', label: 'Python Django' },
        { value: 'kiwi', label: 'Kiwi' },
        { value: 'express', label: 'Express' },
        { value: 'firebase', label: 'Firebase' },
        { value: 'mysql', label: 'MySQL' },
        { value: 'jsp', label: 'JSP' },
        { value: 'dart', label: 'Dart' },
        { value: 'flutter', label: 'Flutter' },
        { value: 'linux', label: 'Linux' },
        { value: 'azure', label: 'Azure' },
        { value: 'go', label: 'Go' },
        { value: 'php', label: 'PHP' },
        { value: 'c', label: 'C' },
        { value: 'cpp', label: 'C++' },
        { value: 'csharp', label: 'C#' },
        { value: 'dotnet', label: '.NET' },
      ];
      
      
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSelectChange = (selectedOptions) => {
        const selectedLabels = selectedOptions.map(option => option.label);
        setSelectedOptions(selectedLabels);
        console.log(selectedLabels);
    };

    return (
        <div>
        <Select
            options={skillOptions}
            isMulti
            value={skillOptions.filter(option => selectedOptions.includes(option.label))}
            onChange={handleSelectChange}
            placeholder="Select options..."
            maxMenuHeight={150}
        />
     </div>
    );
    };

export default Demo;