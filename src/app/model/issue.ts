export class Issue {


    constructor(

    public author: string,
    public component: string,
    public key: string,
    public line: 0,
    public message: string,
    public project: string,
    public resolution: string,
    public rule: string,
    public severity: string,
    public status: string,
    public textRange: {
        endLine: 0,
        endOffset: 0,
        startLine: 0,
        startOffset: 0
    },
    public type: string

    ){}
}
/*
[
    {
        "author": "string",
        "component": "string",
        "key": "string",
        "line": 0,
        "message": "string",
        "project": "string",
        "resolution": "string",
        "rule": "string",
        "severity": "string",
        "status": "string",
        "textRange": {
            "endLine": 0,
            "endOffset": 0,
            "startLine": 0,
            "startOffset": 0
        },
        "type": "string"
    }
]*/