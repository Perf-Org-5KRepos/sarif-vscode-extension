// /********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/
import * as sarif from "sarif";

/**
 * Class that holds the run information processed from the Sarif run
 */
export class RunInfo {

    /**
     * Processes the run passed in and creates a new RunInfo object with the information processed
     * @param run SARIF run object to process
     */
    public static Create(run: sarif.Run) {
        const runInfo = new RunInfo();
        const tool = run.tool;
        runInfo.toolName = tool.name;
        if (runInfo.toolFullName !== undefined) {
            runInfo.toolFullName = tool.fullName;
        } else if (run.tool.semanticVersion !== undefined) {
            runInfo.toolFullName = `${tool.name} ${tool.semanticVersion}`;
        } else {
            runInfo.toolFullName = tool.name;
        }

        if (run.invocations !== undefined) {
            runInfo.cmdLine = run.invocations[0].commandLine;
            if (run.invocations[0].executableLocation !== undefined) {
                runInfo.fileName = run.invocations[0].executableLocation.uri;
            }
            runInfo.workingDir = run.invocations[0].workingDirectory;
        }

        if (run.properties !== undefined) {
            runInfo.additionalProperties = run.properties;
        }

        return runInfo;
    }

    public additionalProperties: { [key: string]: string };
    public cmdLine: string;
    public fileName: string;
    public toolFullName: string;
    public toolName: string;
    public workingDir: string;
}
