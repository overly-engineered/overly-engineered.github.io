<script>
  import Editor from "./Editor.svelte";
  import Results from "./Results.svelte";
  import BenchManager from "negligence/src/benchmanager.js";
  import analyser from "negligence/src/analyser.js";
  import { STRING, INT, FLOAT, BOOLEAN, BIGINT } from "negligence";
  import { debug } from "console";

  export let results;
  export let isRunning = false;
  const logger = {
    startTask: () => ({
      tick: () => {}
    })
  };
  const benchManager = new BenchManager({
    isNode: false,
    logger,
    complexity: [10000, 20000],
    iterations: 100
  });

  const runBenches = () => {
    if (!isRunning) {
      isRunning = true;
      setTimeout(() => {
        const sch = new Function(schema)();
        debugger;
        console.log(sch);
        benchManager.benchmark(
          "test",
          data => {
            data.sort();
          },
          { schema: sch }
        );
        (async () => {
          try {
            const res = await benchManager.execute();
            if (res) {
              const analysedResults = analyser(res, false, logger);
              results = analysedResults[0].stats;
              isRunning = false;
            }
          } catch (e) {
            console.error(e);
          }
        })();
      }, 100);
    }
  };
  export let schema = `/* A single javascript expression showing the schema */
const STRING = "STRING";
const INT = "INT";
const FLOAT = "FLOAT";
const BOOLEAN = "BOOLEAN";
const BIGINT = "BIGINT";

// Expression
return [INT]`;
  export let schemaError = "";

  export let codeString = `/* the data variable is your array to be operated on */
/* global data */
function selectionSort(arr) {
    let min;
    for (let i = 0; i < arr.length; i++) {
        // Assume a minimum value
        min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        // Swap if new minimun value found
        if (min !== i) {
          [arr[i], arr[min]] = [arr[min], arr[i]];
        }
    }
    return arr;
}
return selectionSort(data);`;
</script>

<main>
  <header class="header">
    <h1>Negligence</h1>
    {#if !isRunning}
      <button
        class="run-button"
        disabled={isRunning}
        on:click={() => {
          runBenches();
        }}>Run Benchmarks</button
      >
    {:else}
      <div class="runLabel"><span>Running</span></div>
    {/if}
  </header>
  <div class="container">
    <div class="section">
      <h2>Code:</h2>
      <Editor bind:codeString key="1" />
    </div>
    <div class="section">
      <h2>Output</h2>
      <Editor bind:codeString={schema} key="2" />
    </div>
  </div>
  <div class="container">
    <Results {results} />
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Akaya+Telivigala&display=swap");
  h1 {
    margin-top: 0;
    color: #F0F0F0;
    text-align: left;
    /* text-shadow: 1px 1px 1px lime; */
    /* font-size: 7rem; */
    font-family: "Akaya Telivigala", cursive;
  }

  h1,
  h2 {
    padding: 1rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .container {
    position: relative;
    display: flex;
    flex-direction: row;
    max-height: 400px;
    border-top: 1px solid rgba(248, 248, 242, 0.5);
  }

  .run-button {
    background-color: #00A300;
    color: #F0F0F0;
    cursor: pointer;
  }
  .run-button,
  .runLabel {
    z-index: 5;
    margin-right: 1rem;
    padding: 0.2rem;
    border-radius: 5px;
  }
  .runLabel {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: not-allowed;
  }

  .section {
    margin: 1rem;
    width: 50%;
  }

  @media (max-width: 950px) {
    .container {
      flex-direction: column;
      max-height: 800px;
    }
    .section {
      width: 100%;
    }
  }

</style>
