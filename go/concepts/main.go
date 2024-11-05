package main

import "log"

type RockClimber struct {
	rockClimbed int
	sp          SaftyPlacer
}

type SaftyPlacer interface {
	placeSafety()
}

type IceSafetyPlacer struct {
}

func (i IceSafetyPlacer) placeSafety() {
	log.Println("placing ice safety")
}

func (rc *RockClimber) climbRock() {
	rc.rockClimbed++
	if rc.rockClimbed == 10 {
		// here place safety
		rc.sp.placeSafety()

	}
}

func main() {
	rc := RockClimber{sp: IceSafetyPlacer{}}

	for i := 0; i < 11; i++ {
		rc.climbRock()
	}
}
