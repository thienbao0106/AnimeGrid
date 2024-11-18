<script lang="ts">
  import moment from "moment";
  export let data: any;
</script>

<div class="text-xl flex flex-col gap-y-4 justify-center items-center">
  <h1 class="text-3xl font-bold">Your stats</h1>
  <p>Your point: <span class="font-bold">{data.points}</span></p>
  <p>Guess left: <span class="font-bold">{data.guesses}</span></p>
  <p>
    Date: <span class="font-bold">{moment(data.date).format("M-DD-yyyy")}</span>
  </p>
</div>
