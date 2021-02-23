<script>
  export let results;
  export let formattedResults = "No results yet.";
  export let percentageIncrease;
  export let tableData = [];
  export const threshold = 135;
  $: {
    if (results) {
      console.log(results.percentageIncrease);
      percentageIncrease = results.percentageIncrease;
      delete results.percentageIncrease;
      tableData = Object.keys(results).map(d => {
        return { iterationAmount: d, ...results[d] };
      });
    }
  }
</script>

<div class="results">
  <h2>
    Results <span class="emoji"
      >{#if percentageIncrease > threshold}&#128078{:else if percentageIncrease}&#128077{/if}</span
    >
  </h2>
  <p class="resultParagraph">
    {#if percentageIncrease > threshold}
      Your funtion has a percentage increase of <span class="red">{percentageIncrease}%</span> when doubling the amount of
      items in an array. This is a sign of something in the provided funciton being poorly optimised.
    {:else if percentageIncrease}
      Your funtion has a percentage increase of <span class="green">{percentageIncrease}%</span> when doubling the amount
      of items in an array. This is a sign of something in the provided funciton being poorly optimised.
    {:else}
      {formattedResults}
    {/if}
    {#if percentageIncrease}
    <span class="sub"
      >These results can vary based on the data that is passed in, the function being run and the performance
      optimisations made by the browser for built in functions</span
    >
    {/if}
  </p>
  {#if tableData.length}
    <table style="width:100%">
      <tr>
        <th>Data items per array</th>
        <th>Minimum time</th>
        <th>Maximum time</th>
        <th>Average time</th>
      </tr>
      {#each tableData as row}
        <tr>
          <td>{row.iterationAmount}</td>
          <td>{row.min}</td>
          <td>{row.max}</td>
          <td>{row.average}</td>
        </tr>
      {/each}
    </table>
  {/if}
</div>

<style>
  .results {
    padding: 2rem;
    width: 100%;
  }
  .resultParagraph {
    line-height: 2;
  }
  .sub {
    display: block;
    font-size: 0.7rem;
  }
  .green,
  .red {
    font-weight: bold;
  }
  .green {
    color: green;
  }
  .red {
    color: red;
  }
  h2 {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  table {
    margin-top: 2rem;
    border-collapse: collapse;
  }
  td {
    padding: 0.5rem;
    text-align: left;
  }
  th {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    text-align: left;
  }
  tr:first-of-type {
    border-bottom: 1px solid #F0F0F0;
  }
  .emoji {
    margin-left: 2rem;
    font-size: 3rem;
  }

</style>
