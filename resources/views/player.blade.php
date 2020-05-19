<table>
  <thead>
  <tr>
    <th>Player ID</th>
    <th>Username</th>
    <th>Nickname</th>
    <th>Memoname</th>
    <th>Winnings</th>
    <th>Rake</th>
  </tr>
  </thead>
  <tbody>
  @foreach($players as $player)
    <tr>
      <td>{{ $player['playing_id'] }}</td>
      <td>{{ $player->user->username }}</td>
      <td>{{ $player->nickname }}</td>
      <td>{{ $player->memoname }}</td>
      <td>{{ $player->winnings }}</td>
      <td>{{ $player->rake }}</td>
    </tr>
  @endforeach
  </tbody>
</table>