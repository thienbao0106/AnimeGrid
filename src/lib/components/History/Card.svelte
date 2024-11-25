<script lang="ts">
  import moment from "moment";

  export let mode: string;
  export let level: string;
  export let points: number;
  export let guesses: number;
  export let date: Date;
</script>

<div
  class="w-full flex flex-row justify-start items-center gap-x-3 border border-x-0 border-t-0 border-secondaryColor p-3 mt-3"
>
  <div class="w-2/12">
    Mode: {mode}
  </div>
  <div class="w-10/12">
    <p>Level: <span class="font-bold">{level}</span></p>
    <p>Guess: <span class="font-bold">{guesses}</span></p>
    <p>Points: <span class="font-bold">{points}</span></p>
    <p>Date: <span class="font-bold">{moment(date).fromNow()}</span></p>
  </div>
</div>
