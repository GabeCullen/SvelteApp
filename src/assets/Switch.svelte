<script>
    export let label;
    export let design = 'inner label'
    export let options = [];
    export let fontSize = 16;
    export let value = options[0];


    function toggle(){
        if (value == options[0]) 
            value = options[1]
        else 
            value = options[0]
    } 


</script>

<div class="slider-button" on:click={() => toggle()}>
    <div class="option1" id={options[0]} class:active={value == options[0]}>
        {#if label == "hot-cold-toggle"}
            <img src="/images/fire.png" alt="">
        {/if}
    </div>
    <div class="option2" id={options[1]} class:active={value == options[1]}>
        {#if label == "hot-cold-toggle"}
            <img src="/images/cold.png" alt="">
        {/if}
    </div>
</div>
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

.option1.active {
    background: radial-gradient(#ffacac, #ea2727);
    border-radius: 12px;
}

.option1.active img {
    filter: brightness(1);
}

.option2.active {
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