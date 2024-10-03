const cmdLinePrefix = '--';

const parseArgs = () => {
    const cmdLineArgs = process.argv.slice(2);
    const result = cmdLineArgs.reduce((acc, item, index, arr) => {
        if (!(index % 2)) {
            return `${acc} ${item} is ${arr[index + 1]},`;
        }

        if (index === arr.length - 1) {
            acc = acc.substring(0, acc.length - 1); // rm last comma
        }

        return acc;
    }, '');

    console.log(result);
};

parseArgs();