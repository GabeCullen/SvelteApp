<script>
import Switch from "./Switch.svelte";

let myValue_lights
let myValue_climate
let myValue_ac
let myValue_sound
</script>

<div class="deviceContainer">
    My devices

    <div class="row">
        <div class="device lights" class:on={myValue_lights == "on"}>
            <div class="switchAndLabel">
                {myValue_lights} <Switch bind:value={myValue_lights} label="" options={['off', 'on']} />
            </div>
            <div>Lights</div>
        </div>
        <div class="device climate" class:on={myValue_climate == "on"}>
            <div class="switchAndLabel">
                {myValue_climate} <Switch bind:value={myValue_climate} label="" options={['off', 'on']} />
            </div>
            <div>Climate</div>
        </div>
    </div>

    <div class="row">
        <div class="device ac" class:on={myValue_ac == "on"}>
            <div class="switchAndLabel">
                {myValue_ac} <Switch bind:value={myValue_ac} label="" options={['off', 'on']} />
            </div>
            <div>AC</div>
        </div>
        <div class="device sound" class:on={myValue_sound == "on"}>
            <div class="switchAndLabel">
                {myValue_sound} <Switch bind:value={myValue_sound} label="" options={['off', 'on']} />
            </div>
            <div>Sound</div>
        </div>
    </div>
    
</div>


<style>
.deviceContainer{
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #181818;
    padding: 20px;
    border-radius: 20px;
}

.device{
    background: linear-gradient(#181818, #4d4a4a);
    border: solid 2px black;
    border-style: groove;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.switchAndLabel {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.row{
    display: flex;
    justify-content: space-around;
    gap: 10px;
}

.sound.on {
    background: linear-gradient(225deg, #932cb6, #52036c);
}

.ac.on {
    background: linear-gradient(225deg, #4057c7, #162ea5);
}

.climate.on {
    background: linear-gradient(225deg, #e89622, #d37b00);
}

.lights.on {
    background: linear-gradient(225deg, #fbd100, #c6af00);
}

.climate + .lights + .ac + .sound{
    background: linear-gradient(225deg, #2b2b2b, #000000);
}
</style>