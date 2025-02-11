function select_sample(selectElement) {
    const selectedValue = selectElement.value;

    // Define the paths for each method
    const paths = {
        "VSD": `./video_assets/nerf/VSD/${selectedValue}.mp4`,
        "SDS": `./video_assets/nerf/SDS/${selectedValue}.mp4`,
        "Ours": `./video_assets/nerf/Ours/${selectedValue}.mp4`
    };

    // Update the source of each video element
    document.querySelector("#sect-2-sample-0 source").src = paths["VSD"];
    document.querySelector("#sect-2-sample-1 source").src = paths["SDS"];
    document.querySelector("#sect-2-sample-2 source").src = paths["Ours"];

    // Reload the video elements to reflect the new sources
    document.getElementById("sect-2-sample-0").load();
    document.getElementById("sect-2-sample-1").load();
    document.getElementById("sect-2-sample-2").load();

    // Update the description
    document.getElementById("sect-2-prompt").innerText = getPrompt(selectedValue);
}

// Function to return description based on selected sample
function getPrompt(selectedValue) {
    const prompts = {
        "bulldog": "A bulldog, detailed, high resolution, high quality, sharp.",
        "dog_statue": "Michelangelo style statue of dog reading news on a cellphone.",
        "fluffy_wolf": "A fluffy wolf, detailed, high resolution, high quality, sharp.",
        "horse": "A zoomed out photo of a horse.",
        "pineapple": "A pineapple, detailed, high resolution, high quality, sharp",
        "rock_moss": "A giant rock with moss on it, detailed, high resolution, high quality, sharp.",
        "tudor_house": "A model of a house in Tudor style.",
        "cookies": "A plate piled high with chocolate chip cookies.",
        "elephant_skull": "An elephant skull.",
        "golden_retriever": "A golden retriever, detailed, high resolution, high quality, sharp.",
        "llama": "A llama, detailed, high resolution, high quality, sharp.",
        "policewoman": "A policewoman.",
        "snail": "A snail on a leaf.",
        "walnut": "A walnut, detailed, high resolution, high quality, sharp.",
        "cottage": "A 3D model of an adorable cottage with a thatched roof.",
        "firefighter": "A firefighter standing.",
        "hermit_crab": "A hermit crab.",
        "nurse": "A nurse.",
        "potato_tree": "A tree of potatoes, detailed, high resolution, high quality, sharp.",
        "toucan": "A toucan standing on the wood.",
        "wooden_chair": "A wooden chair, detailed, high resolution, high quality, sharp.",
        "chess": "A compact, cylindrical, vintage pepper mill, with a polished, ornate brass body, slightly worn from use, placed beside a porcelain plate on a checkered tablecloth",
        "cake": "A large, multi-layered, symmetrical wedding cake, with smooth fondant, delicate piping, and lifelike sugar flowers in full bloom, displayed on a silver stand",
        "shell": "A medium-sized, layered, radially symmetrical conch shell, with a rough texture on the outside, fading from pink to cream, sitting alone on a sandy beach",
        "orb": "A small, solid, geometrically spherical, metallic orb, with a glossy ruby finish, nestled in a nest of black velvet, untouched and gleaming under a spotlight",
        "abalone": "A small, solid, radially symmetrical, iridescent abalone shell, with jagged contours, hosting a miniature, tranquil Zen garden complete with tiny, raked sand and micro bonsai",
        "teapot": "A solid, smooth, symmetrical porcelain teapot, with a cobalt blue dragon design, steam rising from the spout, suggesting it's just been filled with boiling water",
        "instruments": "An ensemble of hollow, irregularly shaped musical instruments, including a saxophone, a violin, and a drum, resting on a stage before a jazz concert",
        "wooden_figuring": "An intricately carved, solid, wooden figurine, with jagged contours depicting an ancient deity, the wood grain visible under a matte finish, on a stone altar",
        "birdcage": "An oversized, porous, sphere-shaped birdcage, made of woven golden wires, with a matte finish, housing a small, mechanical, singing bird that flutters in a lifelike manner",
        "seashells": "Various hollow, asymmetrical, textured seashells, collected in a sand-filled, clear glass jar with a twine-tied neck, displayed on a windowsill",
        "crown": "Imperial state crown of England.",
    };

    return prompts[selectedValue] || "Description not available.";
}
