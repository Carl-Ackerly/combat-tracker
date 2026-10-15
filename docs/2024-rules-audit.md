# 2024 D&D rules audit — review branch

Branch: audit/2024-class-rules. Main and the live GitHub Pages app remain unchanged. No actual player character data was accessed, imported, or edited; all tests use temporary fixtures. No Tinsil character was created. CSS is unchanged.

## Sources and coverage

- [Wizards of the Coast 2024 Free Rules](https://www.dndbeyond.com/sources/dnd/br-2024/character-classes): all 12 base-class feature progressions and the eight spellcasting-class tables.
- [Official College of Lore](https://www.dndbeyond.com/subclasses/2190914-college-of-lore): Magical Discoveries and the other Lore features.
- [Licensed 2024 PHB compendium](https://roll20.net/compendium/dnd5e/Subclasses:College%20of%20Glamour?expansion=32231): all 48 named PHB subclasses, 241 accessible feature headings, and spell/resource progression tables. Each source URL is recorded in subclass-audit-inventory.json. Publicly served content was used; no authenticated access was bypassed.
- [SRD 5.2.1](https://www.dndbeyond.com/srd): licensed underlying spell descriptions and class rules.

The earlier source-access limitation was resolved by locating the licensed compendium. Heading coverage proves the feature exists in the reference list; it is not proof of every possible interaction or campaign ruling.

## Initial findings by class (before implementation)

| Class | Missing or incorrect implementation found |
|---|---|
| Barbarian | Improved Brutal Strike upgrades missing; Berserker Mindless Rage absent; other subclass passive coverage incomplete. |
| Bard | Lore discoveries selector and spellbook grant absent; Bonus Proficiencies and Peerless Skill missing; college passives incomplete. |
| Cleric | Domain spells not automatically granted; Greater Divine Intervention has a tracker but incomplete reference; explicit overrides require preservation. |
| Druid | Circle spells not auto-prepared; Land selection absent; Nature’s Ward absent; Archdruid conversion remains manual. |
| Fighter | Champion Remarkable Athlete, Heroic Warrior, Survivor absent. Additional Fighting Style selector already exists. Other subclass high-level reference gaps. |
| Monk | Wholeness of Body uses half Monk level instead of Wisdom modifier. Self-Restoration, Deflect Energy, Disciplined Survivor, Superior Defense, Body and Mind missing; automatic save proficiencies missing. |
| Paladin | Only Vengeance and Devotion spell grants exist; Devotion aura missing; other oaths require complete source verification. |
| Ranger | Hunter’s Lore, Defensive Tactics, Superior Hunter’s Prey missing; other subclass spells absent. |
| Rogue | Slippery Mind not applied; Thief Second-Story Work/Use Magic Device missing; other subclass passive gaps. |
| Sorcerer | Draconic spell grants and passive features absent; other subclass grants not configured. |
| Warlock | Contact Patron free-cast resource missing; invocation reminder incorrectly gated at 2 though choice starts at 1; Fiend spell grants/passives absent. |
| Wizard | Evoker Savant, Potent Cantrip, Empowered Evocation missing. Inline spell selection doesn’t distinguish learned Wizard spells from available spells. |


## Implemented corrections

- Lore Magical Discoveries: two distinct eligible Cleric/Druid/Wizard spell or cantrip choices at Bard 6. The level cap follows the Bard table, not combined multiclass slots. Choices are separate from ordinary preparation, always available in the spellbook, and excluded from preparation/cantrip limits. Initial selection is supported for existing level-6+ characters. One replacement is permitted at each later Bard level; changing both or changing again at the same level is rejected.
- Lore Bonus Proficiencies: three stored skill choices, reflected in sheet proficiency. Peerless Skill, Dance, Valor, and Glamour feature coverage completed. Bard Inspiration die descriptions scale by class level. Magical Secrets expands leveled spell choices without incorrectly expanding normal Bard cantrip choices.
- Original reminders for missing passive/active upgrades throughout all 48 subclasses, shown at their verified class levels. Dashboard remains resource-focused; reference lists stay on the sheet.
- 23 automatic subclass spell-grant sets, including all Cleric domains, all four Paladin oaths, relevant Sorcerer origins/Warlock patrons/Druid circles/Ranger subclasses, Glamour, and Wizard feature grants. Land circle spell sets follow a stored land choice.
- Official spell-list metadata supplements the SRD catalog. Missing proprietary descriptions are identified and linked, not invented. Summon Construct metadata and a short original reminder were verified separately. Every subclass spell grant resolves to a catalog entry, including the Evard/Black Tentacles naming variant.
- Monk Wholeness of Body uses Wisdom modifier, minimum one, rather than half Monk level. Disciplined Survivor grants all save proficiencies; Rogue Slippery Mind and Ranger Iron Mind are reflected on the sheet. Gloom Stalker Initiative, Fey Wanderer Charisma skill bonuses, and Thaumaturge/Magician skill bonuses are included.
- Clockwork Restore Balance uses Charisma modifier, minimum one, rather than proficiency bonus. Ability-based default resource totals calculate from entered scores while preserving explicit saved overrides and spent uses.
- Contact Patron and Beguiling Defenses free-use resources added. Arcane Ward has a separate creation-use tracker, correct maximum, creation restores its HP, and a Long Rest expires the ward without healing character HP.
- Initiative recovery applies to Superior Inspiration, Perfect Focus, and Archdruid when New combat is used. Conditional/optional recovery is left manual when a choice is required.
- Mystic Arcanum, Wizard Spell Mastery/Signature Spells, companion type, domain/primal damage choices, Hunter options, and 2024 invocation choices are configurable. Invocation count, level gates, and pact prerequisites are reflected; repeatable invocation selections have a stored target/detail field. Limited invocation resources appear on the dashboard.
- Wizard learned spellbook management is separate from preparing spells. Legacy prepared entries remain usable. Arcane Trickster gets Mage Hand as its additional feature cantrip. Feature-only spellcasting is visible for Wild Heart, Shadow/Elements Monks, and high-level Psi Warriors.
- Resource reconciliation preserves retired/unknown resource keys, custom state, overrides, and check patterns. Reading the library does not migrate or rewrite the save. Service-worker fallback supports the versioned assets offline.

## Validation

Run node tests/rules-2024.test.cjs. Browser checks require Playwright plus a Chromium-compatible browser: node tests/browser-2024.test.cjs and node tests/all-subclasses-browser.test.cjs. Set PLAYWRIGHT_MODULE/PLAYWRIGHT_CHANNEL if necessary.

- 960 class/subclass/level structural combinations.
- All 160 rows of the eight base spellcasting tables checked for preparation/cantrips and spell slots.
- 241 subclass feature names checked at unlock and immediately below unlock; spell-grant unlock levels checked.
- Lore level-7 fixture: spell + cantrip selection, always-prepared rendering, no normal preparation cost, duplicate/early/wrong-subclass/too-high-level rejection, multiclass cap, replacement limits, persistence.
- All 48 subclasses opened on character sheet, battle dashboard, and spellbook with no page errors.
- Narrow screen sizes: 320, 650, and 1280 pixels.
- Existing fixture HP, spent slots, notes, stories, sessions, custom extension fields, and manual overrides retained. Rest buttons retain the requested no-healing house rule.
- Offline reopening tested, including versioned asset requests.

## Review flags and limits

This is an audited first implementation pass, not certification of every PHB interaction. Review these before declaring complete rules enforcement:

- Invocation target requirements (damaging/attack-roll cantrips, distinct repeat targets and Origin feats), replacement timing, feat prerequisites, and Tome choices still require player review. Basic level and pact requirements are filtered, but removing a prerequisite retains its dependent saved choice and flags it instead of deleting data.
- Normal prepared-spell replacement timing, learned-Wizard-spell acquisition budgets, and most ability/slot exchange costs remain player-managed. Lore replacement limits are enforced separately as requested. Arcanum and Signature spell resource pools are independent of ordinary slots.
- Conditional form, armor, concentration, aura, companion, and once-per-turn effects are short references rather than a combat simulator. Final HP, AC, damage, score increases, feat effects, and equipment bonuses remain manually entered as in the existing app.
- Previously configured resource overrides intentionally survive a rule correction. Use the resource’s “Use class default” control to adopt the recalculated maximum where appropriate.
- Proprietary spell descriptions not in the included SRD catalog are not copied wholesale. Those entries link to verified official/ licensed content; custom spell entry remains available.
- The accessible subclass heading inventory should be checked against the printed PHB for completeness, particularly compound feature sections and any errata. There are no guessed replacement rules for unreadable or ambiguous interactions.

Keep this branch under review; no automatic merge or deployment has been performed.
