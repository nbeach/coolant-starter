#!/usr/bin/env node
import "source-map-support/register"
import { CoolantStack } from "./stack"
import {App} from "@aws-cdk/core"

const app = new App()
new CoolantStack(app, "coolant-stack", { })
