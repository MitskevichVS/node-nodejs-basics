const prefix = 'RSS_';

const parseEnv = () => {
    const envVariables = process.env;
    const result = Object.keys(envVariables)
        .filter((variable) => variable.startsWith(prefix))
        .reduce((acc, variable) => `${acc}${variable}=${envVariables[variable]}; `, '');

    console.log(result);
};

parseEnv();