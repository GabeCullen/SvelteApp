<script lang="ts">
import Slider from "./assets/Slider.svelte";
import Switch from "./assets/Switch.svelte";
import MyDevices from "./assets/MyDevices.svelte";

  let multiValue
  let temperature
  let fan

</script>

<div class="root">
    <div class="heading">
        <div>Temperature</div>
        <Switch bind:value={multiValue} design="hot-cold" options={['heat', 'cool']} />
    </div>

    <div>
        <input type="time" name="" id="">
        <div>to</div>
        <input type="time" name="" id="">
    </div>
    
    <Slider bind:value={temperature} min={18} max={40}/>
    <div class="flexColumn">
      <div style="font-size: 40px;font-weight:bold;">{temperature}°</div>
      <div>Temperature</div>
    </div>
    <Slider bind:value={fan} min={0} max={20}/>

    <div class="sectionWithDivider">
      <div class="flexColumn">
        <div>69m2</div>
        <div class="subtext">First Floor</div>
      </div>
      <div style="align-items: baseline;" class="verticalDivider"></div>
      <div class="flexColumn">
        <div>46m</div>
        <div class="subtext">Timer</div>
      </div>
    </div>

    <MyDevices />
</div>

<style>

.root div.sectionWithDivider {
  background-color: #181818; 
  padding: 10px; 
  align-items:center;
  border-radius:20px;
}

.subtext {
  color: #626262;
  font-size: 12px;
}

.verticalDivider {
  width: 1px;
  height: 100%;
  background-color: #373131;
}

.root {
    padding: 20px;
    gap: 20px;
    display: flex;
    flex-direction: column;
    color: white;
    float: right;
    height:100%;
    background-color:#1e202d;
}

.root > div{
    display: flex;
    gap: 10px;
    align-items: baseline;
    justify-content: space-around;
}

.root div.flexColumn {
  flex-direction: column;
  align-items: center;
  gap: 0;
}
</style>