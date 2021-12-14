class Level {
    constructor() {
        this.objects = [];
        this.spawns = [];
        this.goals = [];
        this.background = null;
        this.dialogues = [];
    }

    addObject(object) {
        this.objects.push(object);
    }

    addSpawn(spawn) {
        this.spawns.push(spawn);
    }

    addGoal(goal) {
        this.objects.push(goal);
        this.goals.push(goal);
    }

    setBackground(background) {
        this.background = background;
    }

    addDialogue(dialogue) {
        this.dialogues.push(dialogue);
    }
}

export { Level };