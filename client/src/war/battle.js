import $ from "jquery";
window.jQuery = require('jquery');
window.velocity = require('velocity-animate/velocity.js')

window.player = {}
window.enemy = {}

window.turn = "player";




/*SPELLS*/

// var meteorStrike = {
//   name: "Meteor Strike",
//   level: 1,
//   spellType: "damage",
//   baseDamage: 15,
//   damageType: "fire",
//   proc: 25,
//   procType: "stun",
//   animation: "animateMeteor",
//   castDelay: 500
// }
//
// var frostNova = {
//   name: "Frost Nova",
//   level: 1,
//   spellType: "damage",
//   baseDamage: 15,
//   damageType: "ice",
//   proc: 100,
//   debuff: "frostBite",
//   animation: "animateFrostNova",
//   coolDownTurns: 4,
//   coolDown: 4,
//   castDelay: 500
// }
//
// var flashHeal = {
//   name: "Flash Heal",
//   level: 1,
//   spellType: "heal",
//   baseDamage: 25,
//   damageType: "heal",
//   animation: "animateFlashHeal",
//   coolDownTurns: 3,
//   coolDown: 3
// }
//
// /*DEBUFFS*/
//
// var frostBite = {
//   duration: 1,
//   turnsLeft: 1,
//   damageDown: 0.5
// }
//
// /*BUFFS*/
//
// var iceShield = {
//   duration: 4,
//   damageDown: 0.5,
//   animation: "animateIceShield"
// }
//







class initBattle { //initiate battle

  killTarget(target) {
    if(target.HP <= 0) {
      $("#"+target.name+"").delay(500).fadeOut(500);
      setTimeout(() =>{
        $("#"+target.name+"").remove();
      }, 1000);
    }
  }

  spellCrit(attacker, target) {
    console.log("Crit!");
    $("#"+attacker.name+"").append("<span class='crit'>Crit!</span>");
    setTimeout(() =>{
      $("#"+attacker.name+" .crit").first().remove();
    }, 1000);
  }

   showDamage(target, damageType, damage) {
    $("#"+target.name+"").append("<span class='"+damageType+"'>"+damage+"</span>");
    setTimeout(function(){
      $("#"+target.name+" ."+damageType+"").first().remove();
    }, 1000);
  }
  animateAttacks(attacker, target) {
    if($("#"+attacker.name+"").hasClass("player")) {
      $("#"+attacker.name+" img").velocity({
        translateZ: "0",
        translateX: "10px"
      },{duration: 200, easing: "easeOutCirc"}).velocity("reverse");
    }
    else {
      $("#"+attacker.name+" img").velocity({
        translateZ: "0",
        translateX: "-10px"
      },{duration: 200, easing: "easeOutCirc"}).velocity("reverse");
    }

    if($("#"+target.name+"").hasClass("player")) {
      $("#"+target.name+" img").velocity({
        translateZ: "0",
        translateX: "-15px"
      },{delay: 100, duration: 200, easing: "easeOutCirc"}).velocity("reverse");
    }
    else {
      $("#"+target.name+" img").velocity({
        translateZ: "0",
        translateX: "15px"
      },{delay: 100, duration: 200, easing: "easeOutCirc"}).velocity("reverse");
    }
  }





   animateMeteor(target) {
    $("#"+target.name+"").append("<div class='meteors'></div>");
    setTimeout(function(){
      $("#"+target.name+" .meteors").last().remove();
    }, 750);
    setTimeout(function(){
      $("body").addClass("shake");
      setTimeout(function(){
        $("body").removeClass("shake");
      },750);
    },500);
  }

   animateIceShield(target) {
    $("#"+target.name+"").toggleClass("ice-armor");
  }

   animateSlash(target) {
    $("#"+target.name+"").addClass("slash-anim");
    setTimeout(function(){
      $("#"+target.name+"").removeClass("slash-anim");
    }, 499);
  }

   animateFrostNova(target) {
    $("#"+target.name+"").addClass("nova");
    setTimeout(function(){
      $("#"+target.name+"").removeClass("nova");
    }, 1000);
  }







   stun(target) {
     setTimeout(function(){
      $("#"+target.name+"").append("<span class='stun'>Stunned!</span>");
      $("#"+target.name+"").append("<div class='stunned'></div>");
     }, 500);

      setTimeout(function(){
        $("#"+target.name+" .stun").first().remove();
        $("#"+target.name+" .stunned").remove();
      }, 1500);
  }




  castSpell(spell, attacker, target) {

    let attackDmg = 100;

    let targetHealth = $("#"+attacker.name+" .health-bar .health");

    this.animateMeteor(attacker);

    $("#"+target.name+" img").velocity({
      translateZ: "0",
      translateX: "-10px"
    },{duration: 200, easing: "easeOutCirc"}).velocity("reverse");
    setTimeout(() => {
      this.spellCrit(attacker, target);



      if(spell.spellType === "damage") {
        target.HP = target.HP - attackDmg;
      }
      else {
        target.HP = target.HP + attackDmg;
      }
      targetHealth.width((target.HP/(target.HP))*100+"%");

      this.showDamage(attacker, spell.damageType, 100);

      this.killTarget(target);
    }, spell.castDelay);
  }


  wepProc(attacker, target) { //chance boost damage

    var procCount = attacker.equipment.weapon.proc.count;
    let targetHealth = $("#"+target.name+" .health-bar .health");
    let hitNum = setInterval(() =>{
      if(procCount > 0) {
        let procDamage = 5;
        let ranX = -50;
        procCount--;
        target.HP = target.HP - procDamage;
        targetHealth.width((target.HP/(target.maxHP))*100+"%");

        $("#"+target.name+"").append("<span class='"+attacker.equipment.weapon.proc.type+"-wep'>"+procDamage+"</span>");
        $("#"+target.name+" ."+attacker.equipment.weapon.proc.type+"-wep").last().velocity({
          translateZ: 0,
          translateY: "-50px",
          translateX: ""+ranX+"px"
        },{duration: 850, easing: "cubic-bezier(.08,.91,.08,.93)"}).velocity({opacity: 0},{duration: 150});

        setTimeout(() =>{
          $("#"+target.name+" ."+attacker.equipment.weapon.proc.type+"").first().remove();
        }, 1000);
      }
      else {
        clearInterval(hitNum);
      }
      this.killTarget(target);
    }, 250);
  }

  roll(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  enemyTurn(attacker, target, attackResult, skill){
    if (target.HP > 0) {
      window.turn = "enemy";
      window.enemyTurn = setTimeout(() => {
        this.attack(target, attacker, attackResult, skill);
        clearInterval(window.enemyTurn);
        $(".controls li").css("pointer-events", "auto");
      }, 1000)
    }
  };


  attack(attacker, target, attackResult, skill){
    if (attacker.HP > 0){
      let targetHealth = $("#"+target.name+" .health-bar .health");
      // let initialHealth = target.HP;

      this.animateAttacks(attacker, target);
      this.showDamage(target, "damage", attackResult[window.turn].damage);

      this.animateSlash(target)

      target.HP = target.HP - attackResult[window.turn].damage;
      targetHealth.width((target.HP/(target.maxHP))*100+"%");


      //Critical
      // this need transfer to server.
      // let rollProc = this.roll(0,100);
      // if (rollProc < attacker.equipment.weapon.proc.chance) {
      //   this.wepProc(attacker, target)
      // }

      this.killTarget(target);

      this.enemyTurn(attacker, target, attackResult, skill);
    }
  }



  click = (attackResult, skill) => {
    window.turn = "player";
    $(".controls li").css("pointer-events", "none");
    // $(".frost-nova").css({"opacity": 0.5, "pointer-events": "none"});

    this.attack(window.player, window.enemy, attackResult, skill);
    // this.attack(window.enemy, window.player, attackResult, skill);
    // this.animateAttacks(player, enemy)
    // this.animateMeteor(player)
    // this.stun(player)
    // this.castSpell(meteorStrike,window.player, window.enemy);
  };
}

export default new initBattle();
