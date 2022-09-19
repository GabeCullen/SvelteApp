<script>
    export let label;
    export let design = 'inner label'
    export let options = [];
    export let value = options[0];


    function toggle(){
        if (value == options[0]) 
            value = options[1]
        else 
            value = options[0]
    } 


</script>

{#if design == "hot-cold"}
    <div class="slider-button" on:click={() => toggle()}>
        <div class="option1 hot" id={options[0]} class:active={value == options[0]}>
            <img src="/images/fire.png" alt="">
        </div>
        <div class="option2 cold" id={options[1]} class:active={value == options[1]}>
            <img src="/images/cold.png" alt="">
        </div>
    </div>
{:else}
    <div class="slider-button" on:click={() => toggle()}>
        <div class="option1 off" id={options[0]} class:active={value == options[0]}>
        </div>
        <div class="option2 on" id={options[1]} class:active={value == options[1]}>
        </div>
    </div>
{/if}


<style>
* {
    display: flex;
    align-items: center;
}

.slider-button {
    display: flex;
    justify-content: space-around;
    width: 45px;
    height: 25px;
    border-radius: 20px;
    background-color: rgb(0, 0, 0);
}

.option1 img {
    filter: brightness(0.2);
    height: 18px;
    width: 22px;
}

.option1 {
    height: 22px;
    width: 22px;
}

.option1.hot.active {
    background: radial-gradient(#ffacac, #ea2727);
    border-radius: 12px;
}

.option1.off.active {
    background: white;
    border-radius: 12px;
}

.option1.active img {
    filter: brightness(1);
}

.option2.cold.active {
    background: radial-gradient(#acfeff, #27b0ea);
    border-radius: 12px;
}

.option2.on.active {
    background: radial-gradient(#acfeff, #27b0ea);
    border-radius: 12px;
}

.option2.active img {
    filter: brightness(1);
}

.option2 img {
    filter: brightness(0.2);
    height: 22px;
    width: 22px;
}

.option2 {
    height: 23px;
    width: 23px;
}

</style>