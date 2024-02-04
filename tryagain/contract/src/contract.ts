// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, UnorderedMap, UnorderedSet, Vector } from 'near-sdk-js';



@NearBindgen({})
class VoteChainContract {

  message: string = "Hello";
  leaderPair = new UnorderedMap<string[]>('leaderPair')
  electionSet = new UnorderedSet<string>('electionSet')
  voteArr = new UnorderedMap<number[]>('voteArr')
  userAdd = new UnorderedMap<string[]>('userAdd')

  @call({})
  addFightingPair(
    { election, data }:
      { election: string, data: [] }) {
    near.log("19", election, data)
    this.leaderPair.set(election, data)

  }
  @call({})
  initializeVote({ election, length }: { election: string, length: number }) {
    this.voteArr.set(election, Array(length).fill(0))
  }
  @call({})
  addtoElectionArr({ election }: { election: string }) {
    this.electionSet.set(election)
  }

  @call({})
  clearElectionArr() {
    this.leaderPair.clear()
    this.electionSet.clear()
    this.voteArr.clear()
    this.userAdd.clear()
    near.log("Done clearing")
  }
  @call({})
  addVote({ election, index, length }: { election: string; index: number, length: number }) {
    let currentVotes = this.voteArr.get(election, { defaultValue: Array(length).fill(0) });
    currentVotes[index] = currentVotes[index] + 1;
    this.voteArr.set(election, currentVotes);
  }

  @call({})
  recordUser({ election, user }: { election: string; user: string }) {
    let currentArray = this.userAdd.get(election, { defaultValue: [] });
    currentArray.includes(user) ? null : currentArray.push(user);
    this.userAdd.set(election, currentArray);
  }

  // @view({})
  // getUrl({ election, name }: { election: string; name: string }): string {
  //   near.log(election);
  //   let candidatePicArray = this.leaderPair.get(election);
  //   return candidatePicArray[candidatePicArray.indexOf(name) + 1];
  // }
  @view({})
  didParticipate({ election, user }: { election: string; user: string }): boolean {
    let promptUserList: string[] = this.userAdd.get(election, {
      defaultValue: [],
    });
    near.log(promptUserList);
    return promptUserList.includes(user);
  }

  @view({})
  participateArray({ election }: { election: string }): string[] {
    return this.userAdd.get(election);
  }

  @view({})
  getAllPrompts(): string[] {
    return this.electionSet.toArray();
  }


  @view({})
  getVotes({ election }: { election: string }): number[] {
    return this.voteArr.get(election, { defaultValue: [] });
  }

  @view({})
  getCandidatePair({ election, length }: { election: string, length: number }): string[] {
    let candidateUrlArray = this.leaderPair.get(election,
      {
        defaultValue: Array(3 * length).fill(0),
      }
    );
    near.log("92", candidateUrlArray)
    return candidateUrlArray;
  }


  // @view({}) // This method is read-only and can be called for free
  // get_greeting(): string {
  //   return this.message;
  // }

  // @call({}) // This method changes the state, for which it cost gas
  // set_greeting({ message }: { message: string }): void {
  //   near.log(`Saving greeting ${message}`);
  //   this.message = message;
  // }
}