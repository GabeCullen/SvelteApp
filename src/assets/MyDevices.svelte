<script>
import Switch from "./Switch.svelte";

let myValue_lights
let myValue_climate
let myValue_ac
let myValue_sound
</script>

<div class="flexColumns">
    My devices

    <div class="flexRows">
        <div class="flexColumn">
            <div class="row">
                {myValue_lights} <Switch bind:value={myValue_lights} label="" options={['off', 'on']} />
            </div>
            <div>Lights</div>
        </div>
        <div class="flexColumn">
            <div class="row">
                {myValue_climate} <Switch bind:value={myValue_climate} label="" options={['off', 'on']} />
            </div>
            <div>Climate</div>
        </div>
    </div>

    <div class="flexRows">
        <div class="flexColumn">
            <div class="row">
                {myValue_ac} <Switch bind:value={myValue_ac} label="" options={['off', 'on']} />
            </div>
            <div>AC</div>
        </div>
        <div class="flexColumn">
            <div class="row">
                {myValue_sound} <Switch bind:value={myValue_sound} label="" options={['off', 'on']} />
            </div>
            <div>Sound</div>
        </div>
    </div>
    
</div>


<style>
.flexColumns{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.flexColumn{
    background-color: #181818;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.row {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.flexRows{
    display: flex;
    justify-content: space-around;
}
</style>