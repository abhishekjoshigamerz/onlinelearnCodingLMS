import React from 'react';
const parse = require('html-react-parser');

const TopicContent = ({topiccontent}) => {
    return (
        <div className="topic-content">
            {topiccontent && typeof topiccontent.description === 'string' ? parse(topiccontent.description) : null}
        </div>
    );
}

export default TopicContent;
